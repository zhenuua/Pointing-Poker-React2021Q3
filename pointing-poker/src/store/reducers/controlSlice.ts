import { createSlice } from '@reduxjs/toolkit';

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    loading: false,
    error: null,
    isActiveChat: true,
    chatIconVisible: false,
  },
  reducers: {
    setLoading(state) {
      state.loading = !state.loading;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    isActiveChat(state) {
      state.isActiveChat = !state.isActiveChat;
    },
    setChatIconVisible(state, action) {
      state.chatIconVisible = action.payload;
    },
  },
});

export const { setLoading, setError, isActiveChat, setChatIconVisible } =
  controlSlice.actions;

export default controlSlice.reducer;
