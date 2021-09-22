import { nanoid } from "nanoid";

import Lobby from '../models/lobbyModel.js';
import Admin from '../models/adminModel.js';
import Player from '../models/playerModel.js';
import Spectator from '../models/spectatorModel.js';
import { generateAccessToken } from '../utils/jwt.js';

export const getUsers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const candidateLobby = await Lobby.findOne({lobbyId: roomId});
    if(!candidateLobby) {
      return res.status(400).json({ message: `lobby with id: ${roomId} does not exist` });
    }

    const players = await Player.find({ roomId });
    const spectators = await Spectator.find({ roomId });
    const admin = await Admin.findOne({ roomId });
    // console.log({ players });
    res.json({ players, spectators, admin });
    // res.json('fetching complete');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'users fetch issue' });
  }
}

export const createAdmin = async (req, res) => {
  try {
    const {
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg
    } = req.body;
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if(!candidateLobby) {
      return res.status(400).json({ message: `lobby with id: ${roomId} does not exist` });
    }
    const admin = new Admin({
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg,
    });
    await admin.save();
    res.json('admin successfully created');
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'admin creation error' });
  }
};

export const createPlayer = async (req, res) => {
  try {
    const {
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg
    } = req.body;
    const candidateLobby = await Lobby.findOne({lobbyId: roomId});
    if(!candidateLobby) {
      return res.status(400).json({ message: `lobby with id: ${roomId} does not exist` });
    }
    const { playerSecret } = candidateLobby;
    const player = new Player({
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg,
    });
    await player.save();
    const playerToken = generateAccessToken(socketId, userRole, playerSecret);
    res.json({ playerToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'player creation error' });
  }
};