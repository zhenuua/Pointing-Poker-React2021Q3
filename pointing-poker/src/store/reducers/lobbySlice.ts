import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Socket } from 'socket.io-client';
import { configLobby } from '../../pages/lobby-page/config';
import { UserRoles } from '../types/sliceTypes';

export interface IUserInfo {
  username: string;
  lastName?: string;
  jobPosition?: string;
  socketId: string;
  userRole: UserRoles;
  roomId: string;
  avatarImg?: string;
}

export interface IChatMessage extends IUserInfo {
  message: string;
}

export enum IssuesPriority {
  LOW = 'LOW',
  MIDDLE = 'MIDDLE',
  HIGH = 'HIGH',
}

export enum ScoreTypes {
  STORY_POINT = 'STORY_POINT',
  FIBBONACCI = 'FIBBONACCI',
}

export enum ShortScoreTypes {
  STORY_POINT = 'SP',
  FIBBONACCI = 'FB',
}

export interface IIssueDetail {
  issueTitle: string;
  // issueLink: string;
  priority: IssuesPriority;
  issueId: string;
}

export interface IGameSettings {
  scramMaster: boolean;
  cardChange: boolean;
  timerNeeded: boolean;
  scoreType: ScoreTypes;
  shortScoreType: ShortScoreTypes;
  roundTime: number;
  cardValues: number[];
}

export interface IBanCandidates {
  id: string;
  voters: string[];
}

interface IInitState {
  lobbyTitle: string;
  chatMessages: IChatMessage[];
  pendingUsers: IUserInfo[];
  users: IUserInfo[];
  issues: IIssueDetail[];
  gameSettings: IGameSettings;
  banCandidates: IBanCandidates[];
}

const initialGameSettings: IGameSettings = {
  scramMaster: true,
  cardChange: false,
  timerNeeded: true,
  scoreType: ScoreTypes.FIBBONACCI,
  shortScoreType: ShortScoreTypes.FIBBONACCI,
  roundTime: 120,
  cardValues: configLobby.cardCollections.FIBBONACCI,
};

const initialState: IInitState = {
  lobbyTitle: '',
  chatMessages: [],
  pendingUsers: [],
  users: [],
  issues: [],
  gameSettings: initialGameSettings,
  banCandidates: [],
};

export const fetchUsers = createAsyncThunk(
  'lobby/fetchUsers',
  async ({ roomId }: { roomId: string }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/users/${roomId}`,
        timeout: 2000,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      alert('server issue, unable to fetch users');
      return rejectWithValue([]);
    }
  },
);

export const fetchUser = createAsyncThunk(
  'lobby/fetchUser',
  async (
    { userRole, socketId }: { userRole: string, socketId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/users/${userRole}/${socketId}`,
        timeout: 2000,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      alert('server issue, unable to fetch user');
      return rejectWithValue([]);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'lobby/deleteUser',
  async (
    { userRole, socketId }: { userRole: string, socketId: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `http://localhost:5000/users/delete`,
        timeout: 2000,
        data: { socketId, userRole },
      });
      return response.data;
    } catch (err) {
      console.error(err);
      alert('server issue, delte  user');
      return rejectWithValue([]);
    }
  },
);

export const cancelGame = createAsyncThunk(
  'lobby/cancelGame',
  async ({ roomId }: { roomId: string }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'delete',
        url: `http://localhost:5000/lobby/delete`,
        timeout: 2000,
        data: { roomId },
      });
      return response.data;
    } catch (err) {
      console.error(err);
      alert('server issue, unable to delte lobby');
      return rejectWithValue([]);
    }
  },
);

const lobbySlice = createSlice({
  name: 'lobby',
  initialState,
  reducers: {
    setLobbyTitle(state, action) {
      state.lobbyTitle = action.payload;
    },
    addChatMessages(state, action) {
      state.chatMessages.push(action.payload);
    },
    addPendingUser(state, action) {
      state.pendingUsers.push(action.payload);
    },
    removePendingUser(state, action) {
      const index = state.pendingUsers.findIndex(
        (user) => user.socketId === action.payload.socketId,
      );
      if (index !== -1) state.pendingUsers.splice(index, 1);
    },
    addUser(state, action) {
      state.users.push(action.payload);
    },
    removeUser(state, action) {
      const index = state.users.findIndex(
        (user) => user.socketId === action.payload.socketId,
      );
      if (index !== -1) state.users.splice(index, 1);
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    addIssue(state, action) {
      state.issues.push(action.payload);
    },
    removeIssue(state, action) {
      const index = state.issues.findIndex(
        (issue) => issue.issueTitle === action.payload,
      );
      if (index !== -1) state.issues.splice(index, 1);
    },
    setGameSettings(state, action) {
      state.gameSettings = action.payload;
    },
    editIssue(state, action) {
      const index = state.issues.findIndex(
        (issue) => issue.issueTitle === action.payload.issueId,
      );
      if (index !== -1) state.issues.splice(index, 1, action.payload);
    },
    setScoreType(state, action) {
      state.gameSettings.scoreType = action.payload;
      const full = `${action.payload}`;
      switch (full) {
        case ScoreTypes.FIBBONACCI:
          {
            state.gameSettings.shortScoreType = ShortScoreTypes.FIBBONACCI;
          }
          break;
        case ScoreTypes.STORY_POINT:
          {
            state.gameSettings.shortScoreType = ShortScoreTypes.STORY_POINT;
          }
          break;
      }
    },
    setCardValues(state, action) {
      state.gameSettings.cardValues = action.payload;
    },
    addCardValue(state, action) {
      state.gameSettings.cardValues.push(action.payload);
    },
    setTimerNeeded(state, action) {
      state.gameSettings.timerNeeded = action.payload;
    },
    setCardChange(state, action) {
      state.gameSettings.cardChange = action.payload;
    },
    setScramMaster(state, action) {
      state.gameSettings.scramMaster = action.payload;
    },
    setRoundTime(state, action) {
      state.gameSettings.roundTime = action.payload;
    },
    addBanVote(state, action) {
      const { candidateId, voterId } = action.payload;
      const index = state.banCandidates.findIndex(
        (banCandidate) => banCandidate.id === candidateId,
      );
      if (index === -1) {
        state.banCandidates.push({ id: candidateId, voters: [voterId] });
      } else {
        const innerIndex = state.banCandidates[index].voters.findIndex(
          (voter) => voter === voterId,
        );
        if (innerIndex === -1) state.banCandidates[index].voters.push(voterId);
      }
      // console.log(state.banCandidates);
      // if (!candidate)
      //   state.banCandidates.push({
      //     id: socketId,
      //     voteCount: 1,
      //   }) else {}
    },
    resetLobby(state, { payload }) {
      const {
        lobbyTitle,
        chatMessages,
        pendingUsers,
        users,
        issues,
        gameSettings,
        banCandidates,
      } = initialState;
      state.lobbyTitle = lobbyTitle;
      state.chatMessages = chatMessages;
      state.pendingUsers = pendingUsers;
      state.users = users;
      state.issues = issues;
      state.gameSettings = gameSettings;
      state.banCandidates = banCandidates;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      const { admin, players, spectators } = payload;
      // console.log(payload);
      const fetchedUsers = [admin, ...players, ...spectators];
      state.users = fetchedUsers;
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      // console.log('new user info');
      // console.log(payload);
      state.users.push(payload);
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      console.log('delete user info');
      console.log(payload);
      const { userId } = payload;
      const index = state.users.findIndex((user) => user.socketId === userId);
      if (index !== -1) state.users.splice(index, 1);
      // state.users.push(payload);
    });
    builder.addCase(cancelGame.fulfilled, (state, { payload }) => {
      const { msg } = payload;
      console.log(msg);
      // const {
      //   lobbyTitle,
      //   chatMessages,
      //   pendingUsers,
      //   users,
      //   issues,
      //   gameSettings,
      //   banCandidates,
      // } = initialState;
      // state.lobbyTitle = lobbyTitle;
      // state.chatMessages = chatMessages;
      // state.pendingUsers = pendingUsers;
      // state.users = users;
      // state.issues = issues;
      // state.gameSettings = gameSettings;
      // state.banCandidates = banCandidates;
    });
  },
});

export const {
  setLobbyTitle,
  addChatMessages,
  addPendingUser,
  removePendingUser,
  addUser,
  removeUser,
  setUsers,
  addIssue,
  removeIssue,
  editIssue,
  setGameSettings,
  setScoreType,
  setCardValues,
  addCardValue,
  setTimerNeeded,
  setCardChange,
  setScramMaster,
  setRoundTime,
  addBanVote,
  resetLobby,
} = lobbySlice.actions;

export default lobbySlice.reducer;
