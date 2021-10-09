import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import userSlice from '../store/reducers/userSlice';
import { UserRoles } from '../store/types/sliceTypes';
import { useActions } from './useActions';
import { useTypedSelector } from './useTypedSelector';
import { SERVER_URL, FRONT_URL } from '../url-config/urls';

export const EVENTSSS = {
  connect: 'connect',
  disconnect: 'disconnect',
  CLIENT: {
    CREATE_LOBBY: 'CREATE_LOBBY',
    SEND_LOBBY_MESSAGE: 'SEND_LOBBY_MESSAGE',
    JOIN_LOBBY: 'JOIN_LOBBY',
    ACCESS_REQ: 'ACCESS_REQ',
    AUTH_ADMIN: 'AUTH_ADMIN',
  },
  SERVER: {
    LOBBIES: 'LOBBIES',
    JOINED_LOBBY: 'JOINED_LOBBY',
    LOBBY_MESSAGE: 'LOBBY_MESSAGE',
    PENDING_USER: 'PENDING_USER',
  },
};

const useSockets = () => {
  const { username, roomId, userRole, token, lastName, socketId, jobPosition } =
    useTypedSelector((state) => state.userSlice);
  // const {
  //   mainSocket: mainSkt,
  //   adminSocket: adminSkt,
  //   chatSocket: chatSkt,
  //   playerSocket: playerSkt,
  // } = useTypedSelector((state) => state.socketSlice);
  // const { setPlayerSocket, setChatSocket, setMainSocket, setAdminSocket } = useActions();

  // const socket: Socket = io(`${SERVER_URL}/`);
  // socket.on(EVENTSSS.connect, () => {
  //   console.log(`you have connected to Socket.IO server`);
  //   // setSocketId(socket.id);
  //   // socket.emit(EVENTSSS.CLIENT.ACCESS_REQ, { roomId, userRole });
  // });

  useEffect(() => {
    const socket: Socket = io(`${SERVER_URL}/`);
    socket.on(EVENTSSS.connect, () => {
      console.log(`you have connected to Socket.IO server`);
      // setSocketId(socket.id);
      // socket.emit(EVENTSSS.CLIENT.ACCESS_REQ, { roomId, userRole });
    });
    // setMainSocket(socket);
  }, []);

  useEffect(() => {
    if (userRole !== UserRoles.USER_ADMIN) return undefined;

    if (userRole === UserRoles.USER_ADMIN && token) {
      const adminSocket: Socket = io(`${SERVER_URL}/admin`, {
        auth: { token: `${token} ${roomId}` },
      });
      adminSocket.on(EVENTSSS.connect, () => {
        console.log(
          `///-----you connected to admin namespace socket id: ${adminSocket.id} -----///`,
        );
      });
      // setAdminSocket(adminSocket);
    }
    return () => {
      // adminSkt?.disconnect();
    };
  }, [userRole]);
};

export default useSockets;

// OLD VERSION
// const useSockets = () => {
//   const { username, roomId, userRole, token, lastName, socketId, jobPosition } = useTypedSelector(
//     (state) => state.userSlice
//   );
//   // const { socket, adminSocket, chatSocket, playerSocket } = useTypedSelector((state) => state.socketSlice);
//   // const { setSocketId, setSocket, setAdminSocket } = useActions();

//   let socketOUter: null | Socket = null;
//   let adminSocketOuter: null | Socket = null;

//   const socketInit = () => {
//     const socket: Socket = io(`${SERVER_URL}/`);
//     socket.on(EVENTSSS.connect, () => {
//       console.log(`you have connected to room:// ${roomId} //, requesting access...`);
//       // setSocketId(socket.id);
//       socket.emit(EVENTSSS.CLIENT.ACCESS_REQ, { roomId, userRole });
//     });
//     return socket;
//   };

//   const adminSocketInit = () => {
//     const adminSocket: Socket = io(`${SERVER_URL}/admin`, { auth: { token: `${token} ${roomId}` } });

//     adminSocket.on(EVENTSSS.connect, () => {
//       console.log(`///-----you connected to admin namespace socket id: ${adminSocket.id} -----///`);
//       // setSocketId(adminSocket.id);
//       adminSocket.emit(EVENTSSS.CLIENT.AUTH_ADMIN, {
//         token,
//         roomId,
//         socketId: adminSocket.id,
//         userRole,
//         username,
//         lastName,
//         jobPosition,
//         issues: [],
//       });
//     });

//     adminSocket.on(EVENTSSS.SERVER.PENDING_USER, ({ userSocketId, userRole: pendingRole }) => {
//       console.log('//-----//');
//       console.log(`incoming access req from user: ${userSocketId} with role: ${pendingRole}`);
//       console.log('//-----//');
//     });

//     return adminSocket;
//   };

//   useEffect(() => {
//     // let playerSocket: null | Socket = null;
//     // let chatSocket: null | Socket = null;

//     switch (userRole) {
//       case UserRoles.USER_ADMIN:
//         adminSocketOuter = adminSocketInit();
//         break;
//       // case UserRoles.USER_PLAYER:
//       //   socket = socketInit();
//       //   break;
//       // case UserRoles.USER_SPECTATOR:
//       //   socket = socketInit();
//       //   break;
//       default:
//         socketOUter = socketInit();
//     }

//     return () => {
//       socketOUter?.disconnect();
//       adminSocketOuter?.disconnect();
//       console.log('socket disconnected');
//     };
//   }, []);

//   return { roomId, userRole };
// };

// const socketInit = (data: {
//   roomId: string;
//   userRole: string;
//   username: string;
//   lastName: string;
//   jobPosition: string;
// }) => {
//   const { roomId, userRole } = data;
//   const socket: Socket = io(`${SERVER_URL}/`);
//   socket.on(EVENTSSS.connect, () => {
//     console.log(`you have connected to room:// ${roomId} //, requesting access...`);
//     socket.emit(EVENTSSS.CLIENT.ACCESS_LOBBY, { roomId, userRole });
//   });
//   return socket;
// };

// const adminSocketInit = (data: {
//   token: string;
//   roomId: string;
//   userRole: string;
//   username: string;
//   lastName: string;
//   jobPosition: string;
// }) => {
//   const { token, roomId, userRole, username, lastName, jobPosition } = data;

//   const adminSocket: Socket = io(`${SERVER_URL}/admin`, { auth: { token: `${token} ${roomId}` } });

//   adminSocket.on(EVENTSSS.connect, () => {
//     console.log(`///-----you connected to admin namespace socket id: ${adminSocket.id} -----///`);
//     adminSocket.emit(EVENTSSS.CLIENT.AUTH_ADMIN, {
//       token,
//       roomId,
//       userRole,
//       username,
//       lastName,
//       jobPosition,
//       issues: [],
//     });
//   });

//   return adminSocket;
// };
