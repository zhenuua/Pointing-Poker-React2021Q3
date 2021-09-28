import { nanoid } from "nanoid";

import Lobby from '../models/lobbyModel.js';
import Admin from "../models/adminModel.js";
import Player from "../models/playerModel.js";
import Spectator from "../models/spectatorModel.js";
import { generateAccessToken } from '../utils/jwt.js';

export const createLobby = async (req, res) => {
  try {
    const { socketId, userRole } = req.body;
    const lobbyId = nanoid().slice(-8);
    const adminSecret = nanoid().slice(-8);
    const playerSecret = nanoid().slice(-8);
    const lobby = new Lobby({ lobbyId, adminSecret, playerSecret });
    await lobby.save();
    const adminToken = generateAccessToken(socketId, userRole, adminSecret);
    res.json({ lobbyId, adminToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Lobby creation error'});
  }
};

export const checkLobby = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    const candidateLobby = await Lobby.findOne({ lobbyId });
    if(!candidateLobby) {
      return res.status(400).json({ message: `lobby with id: ${lobbyId} does not exist` });
    }
    return res.status(200).json({ message: 'lobby found, wait for redirection...' });
  } catch (err) {
    res.status(500).json({ message: 'server error' })
  }
};

export const deleteLobby = async (req, res) => {
  const { roomId } = req.body;

  try {
    const candidateLobby = await Lobby.deleteOne({ lobbyId: roomId });
    await Player.deleteMany({ roomId });
    await Admin.deleteMany({ roomId });
    await Spectator.deleteMany({ roomId });
    const { deletedCount } = candidateLobby;
    deletedCount
      ? res.status(200).send({ msg: `lobby ${roomId} deleted` })
      : res.status(500).send("unable to delete lobby");
  } catch (error) {
    console.log(error);
  }
};
