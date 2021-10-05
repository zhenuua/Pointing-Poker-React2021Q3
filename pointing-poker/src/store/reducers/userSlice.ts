import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { UserRoles } from '../types/sliceTypes';
import { fetchUsers } from './lobbySlice';
import { TLobbyChat } from '../../types/types';

interface IInitState {
  username: string;
  lastName: string;
  jobPosition: string;
  socketId: string;
  userRole: UserRoles;
  token: string;
  roomId: string;
  avatarImg: string;
  lobbyIdMissing: boolean;
  serverError: boolean;
  isObserver: boolean;
}

const initialState: IInitState = {
  username: '',
  lastName: '',
  jobPosition: '',
  socketId: '',
  userRole: UserRoles.USER_PLAYER,
  token: '',
  roomId: '',
  avatarImg: '',
  lobbyIdMissing: false,
  serverError: false,
  isObserver: false,
};

export const createLobby = createAsyncThunk(
  'lobby/createLobby',
  async (
    { socketId, userRole }: { socketId: string, userRole: string },
    { dispatch },
  ) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/lobby/create',
        timeout: 2000,
        data: {
          socketId,
          userRole,
        },
      });
      const { lobbyId, adminToken } = response.data;
      dispatch(setUserRole(UserRoles.USER_ADMIN));
      dispatch(setRoomId(lobbyId));
      dispatch(setToken(adminToken));
    } catch (err) {
      console.error(err);
      dispatch(setServerError(true));
    }
  },
);

export const checkLobby = createAsyncThunk(
  'lobby/createLobby',
  async ({ lobbyId }: { lobbyId: string }, { dispatch }) => {
    let lobbyUrlOrRoomIdPath;
    if (lobbyId.length > 10) {
      lobbyUrlOrRoomIdPath = lobbyId.substr(lobbyId.lastIndexOf('/') + 1);
    } else {
      lobbyUrlOrRoomIdPath = lobbyId;
    }
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/lobby/check/${lobbyUrlOrRoomIdPath}`,
        timeout: 2000,
        params: {
          lobbyUrlOrRoomIdPath,
        },
      });
      dispatch(setRoomId(lobbyUrlOrRoomIdPath));
      // redirectFu(true);
      // if (response.status === 200) {
      // } else {
      // }
    } catch (err) {
      console.error(err);
      dispatch(setLobbyIdMissing(true));
      // alert('lobby not found');
    }
  },
);

interface PlayerData {
  username: string;
  lastName?: string;
  jobPosition?: string;
  socketId: string;
  userRole: UserRoles;
  roomId: string;
  avatarImg?: string;
}

// export const createAdmin = createAsyncThunk(
//   'user/createAdmin',
//   async (playerData: PlayerData, { rejectWithValue }) => {
//     try {
//       const response = await axios({
//         method: 'post',
//         url: 'http://localhost:5000/users/create-admin',
//         timeout: 2000,
//         data: playerData,
//       });
//       // const { playerToken } = response.data;
//       return response.data;
//       // dispatch(setToken(playerToken));
//     } catch (err) {
//       console.error(err);
//       alert('server issue, unable create new admin');
//       return rejectWithValue('');
//     }
//   },
// );

export const createPlayer = createAsyncThunk(
  'user/createPlayer',
  async (
    { userData, emitSocketEvent }: { userData: PlayerData, emitSocketEvent: () => void },
    { rejectWithValue, dispatch },
  ) => {
    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:5000/users/create-player',
        timeout: 2000,
        data: userData,
      });
      // const { playerToken } = response.data;
      emitSocketEvent();
      dispatch(fetchUsers({ roomId: userData.roomId }));
      return response.data;
      // dispatch(setToken(playerToken));
      // dispatch(fetchUsers({ roomId: playerData.roomId }));
    } catch (err) {
      console.error(err);
      alert('server issue, unable create new user');
      return rejectWithValue('');
    }
  },
);

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
    setUserAvatar(state, action) {
      state.avatarImg = action.payload;
    },
    setLobbyIdMissing(state, action) {
      state.lobbyIdMissing = action.payload;
    },
    setServerError(state, action) {
      state.serverError = action.payload;
    },
    setIsObserver(state) {
      state.isObserver = !state.isObserver;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createPlayer.fulfilled, (state, { payload }) => {
      const { playerToken } = payload;
      state.token = playerToken;
    });
  },
});

export const {
  setUsername,
  setLastName,
  setSocketId,
  setUserRole,
  setToken,
  setRoomId,
  setJobPosition,
  setUserAvatar,
  setLobbyIdMissing,
  setServerError,
  setIsObserver,
} = userSlice.actions;

export default userSlice.reducer;
