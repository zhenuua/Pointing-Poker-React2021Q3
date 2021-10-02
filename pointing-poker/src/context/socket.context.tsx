import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { setCurCardValueInScorePlayer, setCurIssue } from '../store/reducers/lobbySlice';
import { EVENTS } from '../store/types/sockeIOEvents';
import { setRoundOn } from '../store/reducers/gameSlice';

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
  socket.on(EVENTS.connect, () => {
    console.log(`you have connected to Socket.IO server`);
    setSocketId(socket.id);
    // setSocketId(socket.id);
    // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
  });

  useEffect(() => {
    // ------------- GAME PAGE --------------
    socket.on(EVENTS.SERVER.SET_CURISSUE, ({ issueTitle }) => {
      dispatch(setCurIssue(issueTitle));
    });

    socket.on('START_ROUND_SERVER', ({ roundOn }) => {
      dispatch(setRoundOn(roundOn));
    });

    socket.on('SCORE_CURRENT_USER_VALUE_SERVER', ({ card, socketId, curScoreIndex }) => {
      dispatch(setCurCardValueInScorePlayer({ card, socketId, curScoreIndex }));
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
