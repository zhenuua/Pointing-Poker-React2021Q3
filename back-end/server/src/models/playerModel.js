import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const Player = new Schema({
  username: {type: String, required: true},
  lastName: {type: String},
  jobPosition: {type: String},
  socketId: {type: String, unique: true, required: true},
  userRole: {type: String, required: true},
  roomId: {type: String, required: true},
  avatarImg: {type: String},
});

const mongoModel = model('Payer', Player);

export default mongoModel;




// const {
//   setUsername,
//   setLastName,
//   setSocketId,
//   setUserRole,
//   setToken,
//   setRoomId,
//   setJobPosition,
// }