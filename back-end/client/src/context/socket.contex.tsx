import React, { createContext, useContext, useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';
import { EVENTS } from '../hooks/useSockets';

interface Context {
  socket: Socket;
  adminSocket: Socket | null;
  playerSocket: Socket | null;
  chatSocket: Socket | null;
}
const SERVER_URL = 'http://localhost:5000/';

const socket = io(SERVER_URL);

socket.on(EVENTS.connect, () => {
  console.log(`you have connected to Socket.IO server`);
  // setSocketId(socket.id);
  // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
});

const SocketContext = createContext<Context>({
  socket,
  adminSocket: null,
  playerSocket: null,
  chatSocket: null,
});

const SocketsProvider = () => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState({});
  const [messages, setMessages] = useState([]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        adminSocket,
        playerSocket,
        chatSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
    // console.log('11')
  );
};

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;
