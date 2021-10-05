import { nanoid } from "nanoid";

import Lobby from '../models/lobbyModel.js';
import Admin from "../models/adminModel.js";
import Player from "../models/playerModel.js";
import Spectator from "../models/spectatorModel.js";
import GameSettings from "../models/gameSettingsModel.js";
import Issues from "../models/issuesModel.js";
import GamePlayers from "../models/gamePlayers.js";
import { generateAccessToken } from '../utils/jwt.js';

export const createLobby = async (req, res) => {
  try {
    const { socketId, userRole } = req.body;
    const lobbyId = nanoid().slice(-8);
    const adminSecret = nanoid().slice(-8);
    const playerSecret = nanoid().slice(-8);
    const lobby = new Lobby({ lobbyId, adminSecret, playerSecret, gameOn: false, gameOver: false });
    await lobby.save();
    const adminToken = generateAccessToken(socketId, userRole, adminSecret);
    res.json({ lobbyId, adminToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'Lobby creation errorors'});
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { roomId, gameOn, gameOver } = req.body;
    const candidateLobby = await Lobby.updateOne(
      { lobbyId: roomId },
      { gameOn, gameOver }
      );
    if(!candidateLobby) {
      return res.status(400).json({ message: `lobby with id: ${roomId} does not exist` });
    }
    res.json({ msg: 'lobby status updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({message: 'unable to change status of the lobby'});
  }
}; 

export const checkLobby = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    const candidateLobby = await Lobby.findOne({ lobbyId });
    if(!candidateLobby) {
      return res.status(400).json({ message: `lobby with id: ${lobbyId} does not exist` });
    }
    const { gameOn, gameOver } = candidateLobby;
    return res.status(200).json({ message: 'lobby found, wait for redirection...', gameOn, gameOver, lobbyId });
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

export const addGameSettings = async (req, res) => {
  const { roomId, gameSettings } = req.body;
  try {
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist, can not add gameSettings` });
    }
    const candidateSettings = await GameSettings.findOne({ lobbyId: roomId });
    if (candidateSettings) {
      return res
        .status(400)
        .json({ message: `gameSettings already exist` });
    }
    const settings = new GameSettings({ lobbyId: roomId, ...gameSettings });
    await settings.save();
    res.json('gameSettings added');
  } catch (error) {
    res.status(500).json('unable to add gameSettings');
    console.log(error);
  }
}

export const addIssues = async (req, res) => {
  const { roomId, issues } = req.body;
  try {
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist, can not add issues` });
    }
    const candidateIssues = await Issues.findOne({ lobbyId: roomId });
    if (candidateIssues) {
      return res
        .status(400)
        .json({ message: `issues already exist` });
    }
    const iss = new Issues({ lobbyId: roomId, issues });
    await iss.save();
    res.json('issues added');
  } catch (error) {
    res.status(500).json('unable to add issues');
    console.log(error);
  }
}

export const addIssue = async (req, res) => {
  const { roomId, issue } = req.body;
  try {
    const candidateIssues = await Issues.findOne({ lobbyId: roomId });
    if (!candidateIssues) {
      return res
        .status(400)
        .json({ message: `unable to find issues, cannot add new issue` });
    }
    const newIssues = [...candidateIssues.issues, issue];
    const candidateIssues2 = await Issues.updateOne(
      { lobbyId: roomId },
      { issues: newIssues }
      );

    if(!candidateIssues2) {
      return res.status(400).json({ message: ` cannot update issues with id: ${roomId}` });
    }
    res.json({ msg: 'issue has been added' });
  } catch (error) {
    res.status(500).json('unable to add issue');
    console.log(error);
  }
}

export const getGameSettings = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    const candidateSettings = await GameSettings.findOne({ lobbyId });
    if (!candidateSettings) {
      return res
        .status(400)
        .json({ message: `can not find game settings` });
    }
    res.json(candidateSettings);
  } catch (error) {
    console.log(error);
  }
};

export const getIssues = async (req, res) => {
  try {
    const { lobbyId } = req.params;
    const candidateIssues = await Issues.findOne({ lobbyId });
    if (!candidateIssues) {
      return res
        .status(400)
        .json({ message: `can not find issues` });
    }
    res.json(candidateIssues);
  } catch (error) {
    console.log(error);
  }
};

export const addPlayers = async (req, res) => {
  const { roomId, players } = req.body;
  try {
    const candidateLobby = await Lobby.findOne({ lobbyId: roomId });
    if (!candidateLobby) {
      return res
        .status(400)
        .json({ message: `lobby with id: ${roomId} does not exist, can not add game palyers` });
    }
    const gamePlayers = new GamePlayers({ lobbyId: roomId, players });
    
    await gamePlayers.save();
    res.json({ msg: 'game players added' });
  } catch (error) {
    res.status(500).json('unable to add game players');
    console.log(error);
  }
} 
