import {
  setUsername,
  setLastName,
  setSocketId,
  setUserRole,
  setToken,
  setRoomId,
  setJobPosition,
} from '../reducers/userSlice';
import {
  setLobbyTitle,
  addChatMessages,
  addPendingUser,
  removePendingUser,
  addUser,
  removeUser,
  addIssue,
  removeIssue,
  setGameSettings,
} from '../reducers/lobbySlice';
import { setLoading, setError } from '../reducers/controlSlice';

const userActionCreators = {
  setUsername,
  setLastName,
  setSocketId,
  setUserRole,
  setToken,
  setRoomId,
  setJobPosition,
};
const lobbyActionCreators = {
  setLobbyTitle,
  addChatMessages,
  addPendingUser,
  removePendingUser,
  addUser,
  removeUser,
  addIssue,
  removeIssue,
  setGameSettings,
};
const controlActionCreators = { setLoading, setError };

const rootActionCreator = {
  ...controlActionCreators,
  ...userActionCreators,
  ...lobbyActionCreators,
};

export default rootActionCreator;
