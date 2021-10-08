import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { error } from 'console';
import { Socket } from 'socket.io-client';
import { checkLobby } from './userSlice';

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

export const updateGameStatus = createAsyncThunk(
  'game/updateGameStatus',
  async (
    { roomId, gameOn, gameOver }: { roomId: string, gameOn: boolean, gameOver: boolean },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios({
        method: 'post',
        url: `https://stark-savannah-25558.herokuapp.com/lobby/update-status`,
        timeout: 2000,
        data: { roomId, gameOn, gameOver },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      alert('unable to update game status');
      return rejectWithValue('unable to update game status');
    }
  },
);

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
  extraReducers: (builder) => {
    builder.addCase(updateGameStatus.fulfilled, (state, { payload }) => {
      const { msg } = payload;
      console.log(msg);
    });
    builder.addCase(checkLobby.fulfilled, (state, { payload }) => {
      const { gameOn, gameOver } = payload;
      state.gameOn = gameOn;
      state.gameOver = gameOver;
    });
  },
});

export const { setCurIssue, setGameIssues, setGameOn, setGameOver, setRoundOn } =
  gameSlice.actions;

export default gameSlice.reducer;
