import { createSlice } from '@reduxjs/toolkit';

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    loading: false,
    error: null,
    isActiveChat: true,
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
  },
});

export const { setLoading, setError, isActiveChat } = controlSlice.actions;

export default controlSlice.reducer;
