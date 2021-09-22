import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { setToken } from '../reducers/userSlice';
import { UserRoles } from '../types/sliceTypes';

interface PlayerData {
  username: string;
  lastName?: string;
  jobPosition?: string;
  socketId: string;
  userRole: UserRoles;
  roomId: string;
  avatarImg?: string;
}

const createPlayer = createAsyncThunk(
  'lobby/createPlayer',
  async (playerData: PlayerData, { dispatch }) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/users/create-player',
        timeout: 2000,
        data: playerData,
      });
      const { playerToken } = response.data;
      dispatch(setToken(playerToken));
      dispatch(fetchUsers({ roomId: playerData.roomId }));
    } catch (err) {
      console.error(err);
      alert('server issue, unable create new user');
    }
  },
);

export const createAdmin = createAsyncThunk(
  'lobby/createAdmin',
  async ({
    userData,
    emitSocketEvent,
  }: {
    userData: PlayerData,
    emitSocketEvent: () => void,
  }) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/users/create-admin',
        timeout: 2000,
        data: userData,
      });
      console.log(response.data);
      emitSocketEvent();
      // const { playerToken } = response.data;
      // dispatch(setToken(playerToken));
    } catch (err) {
      console.error(err);
      alert('server issue, unable create new user');
    }
  },
);

const fetchUsers = createAsyncThunk(
  'lobby/fetchUsers',
  async ({ roomId }: { roomId: string }, { dispatch }) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/users/${roomId}`,
        timeout: 2000,
      });

      console.log(response.data);
      // const {
      //   players,
      //   spactators,
      //   admin,
      // }: { players: PlayerData, spactators: PlayerData, admin: PlayerData } =
      //   response.data;
      // console.log({
      //   players,
      //   spactators,
      //   admin,
      // });
      // dispatch(setUsers(users));
    } catch (err) {
      console.error(err);
      alert('server issue, unable fetch users');
    }
  },
);
