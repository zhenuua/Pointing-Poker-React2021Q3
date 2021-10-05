import mongoose from 'mongoose';
import { GamePlayerSchema } from './gamePlayerModel.js';

const { Schema, model } = mongoose;

export const GamePlayers = new Schema({
  lobbyId: { type: String, required: true, unique: true},
  players: [GamePlayerSchema],
});

const mongoModel = model('GamePlayers', GamePlayers);

export default mongoModel;