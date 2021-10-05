import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const ScoreSchema = new Schema({
  issueTitle: {type: String, required: true},
  score: {type: Number || null, required: true},
  
});

const mongoModel = model('ScoreModel', ScoreSchema);

export default mongoModel;