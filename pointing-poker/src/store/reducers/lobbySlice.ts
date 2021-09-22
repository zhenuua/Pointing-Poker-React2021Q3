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

export interface IIssueDetail {
  issueTitle: string;
  issueLink: string;
  priority: IssuesPriority;
  issueId: string;
}

export interface IGameSettings {
  scramMaster: boolean;
  cardChange: boolean;
  timerNeeded: boolean;
  scoreType: ScoreTypes;
  roundTime: number;
  cardValues: number[];
}

interface IInitState {
  lobbyTitle: string;
  chatMessages: IChatMessage[];
  pendingUsers: IUserInfo[];
  users: IUserInfo[];
  issues: IIssueDetail[];
  gameSettings: IGameSettings;
}

const initialGameSettings: IGameSettings = {
  scramMaster: true,
  cardChange: false,
  timerNeeded: true,
  scoreType: ScoreTypes.FIBBONACCI,
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
};

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
        (issue) => issue.issueId === action.payload.issueId,
      );
      if (index !== -1) state.issues.splice(index, 1);
    },
    setGameSettings(state, action) {
      state.gameSettings = action.payload;
    },
    setScoreType(state, action) {
      state.gameSettings.scoreType = action.payload;
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
  setGameSettings,
  setScoreType,
  setCardValues,
  addCardValue,
  setTimerNeeded,
  setCardChange,
  setScramMaster,
  setRoundTime,
} = lobbySlice.actions;

export default lobbySlice.reducer;
