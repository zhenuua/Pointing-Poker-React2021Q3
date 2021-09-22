import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { UserRoles } from '../types/sliceTypes';

interface IInitState {
  username: string;
  lastName: string;
  jobPosition: string;
  socketId: string;
  userRole: UserRoles;
  token: string;
  roomId: string;
}

const initialState = {
  username: '',
  lastName: '',
  jobPosition: '',
  socketId: '',
  userRole: UserRoles.USER_PLAYER,
  token: '',
  roomId: '',
} as IInitState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setJobPosition(state, action) {
      state.jobPosition = action.payload;
    },
    setSocketId(state, action) {
      state.socketId = action.payload;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setRoomId(state, action) {
      state.roomId = action.payload;
    },
  },
});

export const { setUsername, setLastName, setSocketId, setUserRole, setToken, setRoomId, setJobPosition } =
  userSlice.actions;

export default userSlice.reducer;
