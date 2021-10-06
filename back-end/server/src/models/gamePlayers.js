import mongoose from 'mongoose';
// import { GamePlayerSchema } from './gamePlayerModel.js';

const { Schema, model } = mongoose;

const ScoreSchema = new Schema({
  issueTitle: {type: String, required: true},
  score: {type: Number || null, required: true},
  
});

const GamePlayerSchema = new Schema({
  username: {type: String, required: true},
  lastName: {type: String},
  jobPosition: {type: String},
  socketId: {type: String, unique: true, required: true},
  userRole: {type: String, required: true},
  roomId: {type: String, required: true},
  avatarImg: {type: String},
  scores: [ScoreSchema],
});

export const GamePlayers = new Schema({
  lobbyId: { type: String, required: true, unique: true},
  players: [GamePlayerSchema],
});


const mongoModel = model('GamePlayers', GamePlayers);

export default mongoModel;