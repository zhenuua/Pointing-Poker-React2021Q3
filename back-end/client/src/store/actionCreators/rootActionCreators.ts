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
import { setMainSocket, setAdminSocket, setChatSocket, setPlayerSocket } from '../reducers/socketSlice';

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
const socketActionCreators = { setMainSocket, setAdminSocket, setChatSocket, setPlayerSocket };

const rootActionCreator = {
  ...controlActionCreators,
  ...userActionCreators,
  ...lobbyActionCreators,
  ...socketActionCreators,
};

export default rootActionCreator;
