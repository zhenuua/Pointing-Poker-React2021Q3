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
  roundTime: string;
  cardValues: string[];
}

interface IInitState {
  lobbyTitle: string;
  chatMessages: IChatMessage[];
  pendingUsers: IUserInfo[];
  users: IUserInfo[];
  issues: IIssueDetail[];
  gameSettings: IGameSettings | null;
}

const initialState: IInitState = {
  lobbyTitle: '',
  chatMessages: [],
  pendingUsers: [],
  users: [],
  issues: [],
  gameSettings: null,
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
  },
});

export const {
  setLobbyTitle,
  addChatMessages,
  addPendingUser,
  removePendingUser,
  addUser,
  removeUser,
  addIssue,
  removeIssue,
  setGameSettings,
} = lobbySlice.actions;

export default lobbySlice.reducer;
