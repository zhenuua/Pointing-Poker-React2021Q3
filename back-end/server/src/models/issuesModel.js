import mongoose from 'mongoose';
import { IssueSchema } from './issueModel.js';

const { Schema, model } = mongoose;

const Issues = new Schema({
  lobbyId: {type: String, unique: true, required: true},
  issues: [IssueSchema],
});

const mongoModel = model('Issues', Issues);

export default mongoModel;