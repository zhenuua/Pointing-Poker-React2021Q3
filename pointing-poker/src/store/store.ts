import { combineReducers, configureStore } from '@reduxjs/toolkit';
import controlSlice from './reducers/controlSlice';
import lobbySlice from './reducers/lobbySlice';
import userSlice from './reducers/userSlice';
import gameSlice from './reducers/gameSlice';

const rootReducer = combineReducers({ controlSlice, userSlice, lobbySlice, gameSlice });

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
