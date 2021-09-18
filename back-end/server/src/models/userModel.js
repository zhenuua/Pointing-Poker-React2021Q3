import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const User = new Schema({
  username: {type: String, required: true},
  lastName: {type: String},
  jobPosition: {type: String},
  socketId: {type: String, unique: true, required: true},
  userRole: {type: String, required: true},
  roomId: {type: String, required: true},
  avatarImg: {type: String},
});

const mongoModel = model('User', User);

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