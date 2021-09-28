import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSocketsContext } from '../context/socket.context';
import { resetLobby } from '../store/reducers/lobbySlice';
import { UserRoles } from '../store/types/sliceTypes';
import { useActions } from './useActions';
import { useTypedSelector } from './useTypedSelector';

export const useResetUser = () => {
  const { username, lastName, jobPosition, roomId, token, userRole } = useTypedSelector(
    (state) => state.userSlice,
  );
  const { socket } = useSocketsContext();
  const dispatch = useDispatch();
  const { setUsername, setLastName, setJobPosition, setRoomId, setToken, setUserRole } =
    useActions();
  useEffect(() => {
    setUsername('');
    setLastName('');
    setJobPosition('');
    setRoomId('');
    setToken('');
    setUserRole(UserRoles.USER_PLAYER);
    console.log('reseting user data...');
    dispatch(resetLobby({ msg: 'reseting lobby...' }));
    // socket.removeAllListeners();
  }, []);
};
