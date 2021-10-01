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

// export interface IScore {
//   socketId: string;
//   score: number | null;
// }

export interface IScore {
  issueTitle: string;
  score: number | null;
}

// export interface IGameIssue {
//   issueId: string;
//   scores: IScore[];
// }

export interface IGamePlayer extends IUserInfo {
  scores: IScore[];
}

interface IInitState {
  lobbyTitle: string;
  chatMessages: IChatMessage[];
  pendingUsers: IUserInfo[];
  users: IUserInfo[];
  issues: IIssueDetail[];
  gameSettings: IGameSettings;
  banCandidates: IBanCandidates[];
  players: IGamePlayer[];
  curIssue: IIssueDetail | null;
  // curIssue: IGameIssue | null;
  // gameIssues: IGameIssue[];
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
  players: [],
  curIssue: null,
  // gameIssues: [],
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

interface IPostSettingsIssues {
  roomId: string;
  gameSettings: IGameSettings;
  issues: IIssueDetail[];
  emitEvent: () => void;
}

export const postSettingsIssues = createAsyncThunk(
  'lobby/settingsIssues',
  async (
    { roomId, gameSettings, issues, emitEvent }: IPostSettingsIssues,
    { rejectWithValue },
  ) => {
    try {
      const responseSettings = await axios({
        method: 'post',
        url: `http://localhost:5000/lobby/game-settings`,
        timeout: 2000,
        data: { roomId, gameSettings },
      });
      const responseIssues = await axios({
        method: 'post',
        url: `http://localhost:5000/lobby/issues`,
        timeout: 2000,
        data: { roomId, issues },
      });
      emitEvent();
      return {
        msg: `${responseSettings.data}  ${responseIssues.data}`,
      };
    } catch (err) {
      console.log(err);
      alert('unable to add setting or issues');
      return rejectWithValue('unable to add setting or issues');
    }
  },
);

export const fetchGameSettings = createAsyncThunk(
  'lobby/fetchGameSettings',
  async ({ roomId }: { roomId: string }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/lobby/game-settings/${roomId}`,
        timeout: 5000,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      alert('server issue, unable to fetch game settings');
      return rejectWithValue([]);
    }
  },
);

export const fetchIssues = createAsyncThunk(
  'lobby/fetchIssues',
  async ({ roomId }: { roomId: string }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'get',
        url: `http://localhost:5000/lobby/issues/${roomId}`,
        timeout: 5000,
      });
      return response.data.issues;
    } catch (err) {
      console.error(err);
      alert('server issue, unable to fetch issues');
      return rejectWithValue([]);
    }
  },
);

const checkScrumMaster = (state: IInitState, scrumMaster: any) => {
  if (scrumMaster) {
    const adminIndex = state.players.findIndex(
      (user) => user.userRole === UserRoles.USER_ADMIN,
    );
    if (adminIndex === -1) {
      const arr = state.issues.map((issue) => ({
        issueTitle: issue.issueTitle,
        score: null,
      }));
      state.players = [{ ...state.users[0], scores: arr }, ...state.players];
      // state.gameIssues.forEach((issue) => {
      //   const adminScore = { socketId: state.users[0].socketId, score: null };
      //   issue.scores.unshift(adminScore);
      // });
    }
  } else {
    const adminIndex = state.players.findIndex(
      (user) => user.userRole === UserRoles.USER_ADMIN,
    );
    if (adminIndex !== -1) {
      state.players.splice(adminIndex, 1);
      // state.gameIssues.forEach((issue) => {
      //   issue.scores.shift();
      // });
    }
  }
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
      if (!state.issues.length) {
        state.curIssue = action.payload;
      }
      state.issues.push(action.payload);
      state.players.forEach((user) => {
        const newScore = {
          issueTitle: action.payload.issueTitle,
          score: null,
        };
        user.scores.push(newScore);
      });
      // const gameIssue = {
      //   issueId: action.payload.issueTitle,
      //   scores: state.players.map((user) => ({
      //     socketId: user.socketId,
      //     score: null,
      //   })),
      // };
      // state.gameIssues.push(gameIssue);
      // state.gameIssues
    },
    removeIssue(state, action) {
      // if (state.issues.length === 1) state.curIssue = null;
      const index = state.issues.findIndex(
        (issue) => issue.issueTitle === action.payload,
      );
      if (index !== -1) {
        state.issues.splice(index, 1);
        const matchIndex = state.issues.findIndex(
          (issue) => issue.issueTitle === state.curIssue?.issueTitle,
        );
        if (matchIndex === -1) [state.curIssue] = state.issues;
        if (!state.issues.length) state.curIssue = null;
        state.players.forEach((user) => {
          user.scores.splice(index, 1);
        });
      }
    },
    setGameSettings(state, action) {
      state.gameSettings = action.payload;
      checkScrumMaster(state, action.payload.scramMaster);
      // if (action.payload.scramMaster) {
      //   const adminIndex = state.players.findIndex(
      //     (user) => user.userRole === UserRoles.USER_ADMIN,
      //   );
      //   if (adminIndex === -1) state.players = [state.users[0], ...state.players];
      // } else {
      //   const adminIndex = state.players.findIndex(
      //     (user) => user.userRole === UserRoles.USER_ADMIN,
      //   );
      //   if (adminIndex !== -1) state.players.splice(adminIndex, 1);
      // }
    },
    editIssue(state, action) {
      const index = state.issues.findIndex(
        (issue) => issue.issueTitle === action.payload.issueId,
      );
      if (index !== -1) {
        console.log(index);
        state.issues.splice(index, 1, action.payload);
        if (state.players.length) {
          state.players.forEach((user) => {
            const newScore = {
              issueTitle: action.payload.issueId,
              score: null,
            };
            console.log(newScore);
            user.scores.splice(index, 1, newScore);
            // donesnt work dont know why!!!!!!!!!!!!!!!!!!!!!!!!!!!
          });
        }
      }
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
      checkScrumMaster(state, action.payload);
      // if (action.payload) {
      //   const adminIndex = state.players.findIndex(
      //     (user) => user.userRole === UserRoles.USER_ADMIN,
      //   );
      //   if (adminIndex === -1) state.players = [state.users[0], ...state.players];
      // } else {
      //   const adminIndex = state.players.findIndex(
      //     (user) => user.userRole === UserRoles.USER_ADMIN,
      //   );
      //   if (adminIndex !== -1) state.players.splice(adminIndex, 1);
      // }
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
    },
    setCurIssue(state, action) {
      state.curIssue = action.payload;
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
      const fetchedUsers = [admin, ...players, ...spectators];
      state.users = fetchedUsers;
      const scores = state.issues.map((issue) => ({
        issueTitle: issue.issueTitle,
        // !!!!!!!!!!below coub be a bug cause it forces nulls!!!!!!!!!!!!!!!!
        score: null,
      }));
      state.players = state.gameSettings.scramMaster
        ? [
            { ...admin, scores },
            ...players.map((user: IUserInfo) => ({
              ...user,
              scores,
            })),
          ]
        : players.map((user: IUserInfo) => ({
            ...user,
            scores,
          }));
    });
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      const { userRole } = payload;
      state.users.push(payload);
      if (userRole === UserRoles.USER_PLAYER) {
        const scores = state.issues.map((issue) => ({
          issueTitle: issue.issueTitle,
          // !!!!!!!!!!below coub be a bug cause it forces nulls!!!!!!!!!!!!!!!!
          score: null,
        }));
        state.players.push({ ...payload, scores });
        // state.gameIssues.forEach((issue) => {
        //   const newScore = { socketId: payload.socketId, score: null };
        //   issue.scores.push(newScore);
        // });
      }
      // may be not enough logic to handle admin joining????
      // if (userRole === UserRoles.USER_ADMIN && state.gameSettings.scramMaster || userRole === UserRoles.USER_PLAYER)
      // state.gameIssues = newGameIssues;
    });
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      console.log('delete user info');
      console.log(payload);
      const { userId } = payload;
      const index = state.users.findIndex((user) => user.socketId === userId);
      if (index !== -1) state.users.splice(index, 1);
      const indexPlayer = state.players.findIndex((user) => user.socketId === userId);
      if (indexPlayer !== -1) state.players.splice(indexPlayer, 1);
    });
    builder.addCase(cancelGame.fulfilled, (state, { payload }) => {
      const { msg } = payload;
      console.log(msg);
    });
    builder.addCase(postSettingsIssues.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(fetchGameSettings.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.gameSettings = payload;
      checkScrumMaster(state, payload.scrumMaster);
    });
    builder.addCase(fetchIssues.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.issues = payload;
      state.players.length &&
        state.players.forEach((user) => {
          payload.map((issue: any) => {
            const newScore = {
              issueTitle: issue.issueTitle,
              score: null,
            };
            user.scores.push(newScore);
          });
        });
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
  setCurIssue,
} = lobbySlice.actions;

export default lobbySlice.reducer;
