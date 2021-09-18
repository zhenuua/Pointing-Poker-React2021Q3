import jwt from "jsonwebtoken";
import Lobby from '../models/lobbyModel.js';
import { nanoid } from "nanoid";

const { sign } = jwt;

const generateAccessToken = (socketId, userRole, secret) => {
  const payload = {
    socketId,
    userRole
  }
  return sign(payload, secret, {expiresIn: "1h"} )
}

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
    res.status(500).json({message: 'Lobby creation error'})
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

export const getUsers = async (req, res) => {
  try {
    console.log('requesting something from users...');
    res.json('server is working');
  } catch (err) {

  } 

};

export const addUser = async (req, res) => {
  try {

  } catch (err) {

  } 

};

export const deleteUser = async (req, res) => {
  try {
    
  } catch (err) {

  }  
};