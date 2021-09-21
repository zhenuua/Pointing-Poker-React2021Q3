import { nanoid } from "nanoid";

import Lobby from "../models/lobbyModel.js";
import Admin from "../models/adminModel.js";
import Player from "../models/playerModel.js";
import Spectator from "../models/spactatorModel.js";
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
    // console.log({ players });
    res.json({ players, spectators, admin });
    // res.json('fetching complete');
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

export const deleteUser = async (req, res) => {
  const { socketId, userRole } = req.body;

  try {
    let del;
    switch (userRole) {
      case "ADMIN":
        {
          del = await Admin.deleteOne({ socketId });
          !del
            ? res.status(200).send("OK")
            : res.status(500).send("Something went wrong");
        }
        break;
      case "PLAYER":
        {
          del = await Player.deleteOne({ socketId });
          !del
            ? res.status(200).send("OK")
            : res.status(500).send("Something went wrong");
        }
        break;
      case "SPECTATOR":
        {
          del = await Spectator.deleteOne({ socketId });
          !del
            ? res.status(200).send("OK")
            : res.status(500).send("Bad request");
        }
        break;
      default:
        res.status(404).send("User not found");
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
