import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Socket } from 'socket.io-client';

export interface IScore {
  socketId: string;
  score: number | null;
}

export interface IGameIssue {
  issueId: string;
  scores: IScore[];
}

export interface IInitState {
  curIssue: IGameIssue | null;
  gameIssues: IGameIssue[];
  gameOn: boolean;
  gameOver: boolean;
  roundOn: boolean;
}

const initialState: IInitState = {
  curIssue: null,
  gameIssues: [],
  gameOn: false,
  gameOver: false,
  roundOn: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurIssue(state, action) {
      state.curIssue = action.payload;
    },
    setGameIssues(state, action) {
      state.gameIssues = action.payload;
    },
    setGameOn(state, action) {
      state.gameOn = action.payload;
    },
    setGameOver(state, action) {
      state.gameOver = action.payload;
    },
    setRoundOn(state, action) {
      state.roundOn = action.payload;
    },
  },
});

export const { setCurIssue, setGameIssues, setGameOn, setGameOver, setRoundOn } =
  gameSlice.actions;

export default gameSlice.reducer;
