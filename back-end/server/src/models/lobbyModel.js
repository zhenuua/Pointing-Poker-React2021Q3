import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Lobby = new Schema({
  lobbyId: {type: String, required: true, unique: true},
  adminSecret: {type: String, required: true, unique: true},
  playerSecret: {type: String, required: true, unique: true},
  gameOn: {type: String, required: true},
  gameOver: {type: String, required: true},
});

const mongoModel = model('Lobby', Lobby);

export default mongoModel;