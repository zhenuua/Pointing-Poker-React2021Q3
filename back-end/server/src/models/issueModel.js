import mongoose from 'mongoose';

const { Schema, model } = mongoose;

export const IssueSchema = new Schema({
  issueTitle: {type: String, required: true},
  priority: {type: String, required: true},
  issueId: {type: String},
});

const mongoModel = model('Issue', IssueSchema);

export default mongoModel;