import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { addPendingUser, IPendingUser, setCurIssue } from '../store/reducers/lobbySlice';
import { EVENTS } from '../store/types/sockeIOEvents';

interface Context {
  socket: Socket;
  adminSocket: Socket | null;
  playerSocket: Socket | null;
  chatSocket: Socket | null;
}
const SERVER_URL = 'http://localhost:5000/';

const socket = io(SERVER_URL, {
  reconnectionAttempts: 3,
  reconnectionDelay: 2000,
});

const SocketsContext = createContext<Context>({
  socket,
  adminSocket: null,
  playerSocket: null,
  chatSocket: null,
});

const SocketsProvider = ({ children }: { children: ReactNode }) => {
  const { issues } = useTypedSelector((state) => state.lobbySlice);

  const { setSocketId } = useActions();
  const dispatch = useDispatch();
  const history = useHistory();
  socket.on(EVENTS.connect, () => {
    console.log(`you have connected to Socket.IO server`);
    setSocketId(socket.id);
    // setSocketId(socket.id);
    // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
  });

  useEffect(() => {
    // ------------- MAIN PAGE --------------
    socket.on(EVENTS.SERVER.PENDING_USER_RES, ({ access, roomId }) => {
      console.log(`your access status is !${access}! for game in room ${roomId}`);
      if (!access) {
        alert('access to lobby have been denyed');
        history.push('/');
      } else {
        history.push(`/lobby-page/${roomId}`);
      }
    });

    // ------------- GAME PAGE --------------
    socket.on(EVENTS.SERVER.SET_CURISSUE, ({ issueTitle }) => {
      dispatch(setCurIssue(issueTitle));
    });

    socket.on(EVENTS.SERVER.PENDING_USER_REQ, (pendingUser: IPendingUser) => {
      dispatch(addPendingUser(pendingUser));
    });
  }, []);

  return (
    <SocketsContext.Provider
      value={{
        socket,
        adminSocket: null,
        playerSocket: null,
        chatSocket: null,
      }}
    >
      {children}
    </SocketsContext.Provider>
  );
};

export const useSocketsContext = () => useContext(SocketsContext);

export default SocketsProvider;

// socket.on(EVENTS.connect, () => {
//   console.log(`you have connected to Socket.IO server`);
//   // setSocketId(socket.id);
//   // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
// });
