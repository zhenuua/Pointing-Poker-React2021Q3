import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { useActions } from '../hooks/useActions';
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
  const { setSocketId } = useActions();
  socket.on(EVENTS.connect, () => {
    console.log(`you have connected to Socket.IO server`);
    setSocketId(socket.id);
    // setSocketId(socket.id);
    // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
  });

  socket.on('sending', (msg) => {
    console.log(msg);
  });

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
