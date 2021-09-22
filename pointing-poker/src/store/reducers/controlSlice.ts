import { createSlice } from '@reduxjs/toolkit';

const controlSlice = createSlice({
  name: 'control',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state) {
      state.loading = !state.loading;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = controlSlice.actions;

export default controlSlice.reducer;
