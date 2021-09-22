import { createSlice } from '@reduxjs/toolkit';
import { Socket } from 'socket.io-client';
import { UserRoles } from '../types/sliceTypes';

export interface IUserInfo {
  username: string;
  lastName: string;
  jobPosition: string;
  socketId: string;
  userRole: UserRoles;
}

export interface IChatMessage extends IUserInfo {
  message: string;
}

interface IInitState {
  mainSocket: Socket | null;
  adminSocket: Socket | null;
  chatSocket: Socket | null;
  playerSocket: Socket | null;
}

const initialState: IInitState = {
  mainSocket: null,
  adminSocket: null,
  chatSocket: null,
  playerSocket: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setMainSocket(state, action) {
      state.mainSocket = action.payload;
    },
    setAdminSocket(state, action) {
      state.adminSocket = action.payload;
    },
    setChatSocket(state, action) {
      state.chatSocket = action.payload;
    },
    setPlayerSocket(state, action) {
      state.playerSocket = action.payload;
    },
  },
});

export const { setMainSocket, setAdminSocket, setChatSocket, setPlayerSocket } = socketSlice.actions;

export default socketSlice.reducer;
