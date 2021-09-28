import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const GameSettings = new Schema({
  lobbyId: {type: String, unique: true, required: true},
  scramMaster: {type: Boolean, required: true},
  cardChange: {type: Boolean, required: true},
  timerNeeded: {type: Boolean, required: true},
  scoreType: {type: String, required: true},
  shortScoreType: {type: String, required: true},
  roundTime: {type: Number},
  cardValues: [Number],
});

const mongoModel = model('GameSettings', GameSettings);

export default mongoModel;