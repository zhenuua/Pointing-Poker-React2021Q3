import mongoose from 'mongoose';
import { ScoreSchema } from './scoreModel.js';

const { Schema, model } = mongoose;

export const GamePlayerSchema = new Schema({
  username: {type: String, required: true},
  lastName: {type: String},
  jobPosition: {type: String},
  socketId: {type: String, unique: true, required: true},
  userRole: {type: String, required: true},
  roomId: {type: String, required: true},
  avatarImg: {type: String},
  scores: [ScoreSchema],
});

const mongoModel = model('GamePlayerModel', GamePlayerSchema);

export default mongoModel;