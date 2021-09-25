import { nanoid } from "nanoid";

import Lobby from "../models/lobbyModel.js";
import Admin from "../models/adminModel.js";
import Player from "../models/playerModel.js";
import Spectator from "../models/spectatorModel.js";
import { generateAccessToken } from "../utils/jwt.js";

export const getUsers = async (req, res) => {
  try {
    const { roomId } = req.params;
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist` });
    }

    const players = await Player.find({ roomId });
    const spectators = await Spectator.find({ roomId });
    const admin = await Admin.findOne({ roomId });
    res.json({ players, spectators, admin });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "users fetch issue" });
  }
};

export const createAdmin = async (req, res) => {
  try {
    const {
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg,
    } = req.body;
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist` });
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
    res.json("admin successfully created");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "admin creation error" });
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
      avatarImg,
    } = req.body;
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist` });
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
    res.status(500).json({ message: "Player creation error" });
  }
};

export const createSpectator = async (req, res) => {
  try {
    const {
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg,
    } = req.body;
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist` });
    }
    const spectator = new Spectator({
      username,
      lastName,
      jobPosition,
      socketId,
      userRole,
      roomId,
      avatarImg,
    });
    await spectator.save();
    res.json({ message: "Spectator has been created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Spectator creation error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userRole, socketId } = req.params;
    let candidate;
    switch (userRole) {
      case "ADMIN":
        {
          candidate = await Admin.findOne({ socketId });
          candidate
            ? res.status(200).send(candidate)
            : res.status(403).send("unable to find admin");
        }
        break;
      case "PLAYER":
        {
          candidate = await Player.findOne({ socketId });
          candidate
            ? res.status(200).send(candidate)
            : res.status(403).send("unable to find palyer");
        }
        break;
      case "SPECTATOR":
        {
          candidate = await Spectator.findOne({ socketId });
          candidate
            ? res.status(200).send(candidate)
            : res.status(403).send("unable to find spectator");
        }
        break;
      default:
        res.status(404).send("unable to find User, not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = async (req, res) => {
  const { socketId, userRole } = req.body;

  try {
    let candidate;
    switch (userRole) {
      case "ADMIN":
        {
          candidate = await Admin.deleteOne({ socketId });
          const { deletedCount } = candidate;
          deletedCount
            ? res.status(200).send({ userId: socketId })
            : res.status(500).send("unable delete admin");
        }
        break;
      case "PLAYER":
        {
          candidate = await Player.deleteOne({ socketId });
          const { deletedCount } = candidate;
          deletedCount
            ? res.status(200).send({ userId: socketId })
            : res.status(500).send("unable delete player");
        }
        break;
      case "SPECTATOR":
        {
          candidate = await Spectator.deleteOne({ socketId });
          const { deletedCount } = candidate;
          deletedCount
            ? res.status(200).send({ userId: socketId })
            : res.status(500).send("unable delete spectator");
        }
        break;
      default:
        res.status(404).send("unable delete User, not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllUser = async (req, res) => {
  const { roomId } = req.body;
  try {
    await Player.deleteMany({ roomId });
    await Admin.deleteMany({ roomId });
    await Spectator.deleteMany({ roomId });
    res.status(200).send("All users have been removed");
  } catch (error) {
    console.log(error);
    res.status(404).send("Unable to delete users");
  }
};

