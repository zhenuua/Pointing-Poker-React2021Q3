import { combineReducers, configureStore } from '@reduxjs/toolkit';
import controlSlice from './reducers/controlSlice';
import lobbySlice from './reducers/lobbySlice';
import socketSlice from './reducers/socketSlice';
import userSlice from './reducers/userSlice';

const rootReducer = combineReducers({ controlSlice, userSlice, socketSlice, lobbySlice });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
