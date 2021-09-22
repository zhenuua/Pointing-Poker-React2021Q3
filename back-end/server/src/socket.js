import { createUser } from './z-unneccesary-files/lobby.js';
import { lobbiesData } from "./z-unneccesary-files/lobbiesData.js";

  
export const EVENTS = {
  connection: "connection",
  disconnect: "disconnect",
  CLIENT: {
    CREATE_LOBBY: "CREATE_LOBBY",
    SEND_LOBBY_MESSAGE: "SEND_LOBBY_MESSAGE",
    JOIN_LOBBY: "JOIN_LOBBY",
    ACCESS_REQ: "ACCESS_REQ",
    AUTH_ADMIN: "AUTH_ADMIN",
  },
  SERVER: {
    LOBBIES: "LOBBIES",
    JOINED_LOBBY: "JOINED_LOBBY",
    LOBBY_MESSAGE: "LOBBY_MESSAGE",
    USER_JOIN: "USER_JOIN",
    PENDING_USER: "PENDING_USER",
  },
};

const socketInit = ({ io }) => {
  console.log('----SOCKETS ENABLED----');

  const adminSpace = io.of('/admin');

  adminSpace.use((socket, next) => {
    const combinedToken = socket.handshake.auth.token.split(' ');
    const [token, roomId] = combinedToken;
    console.log(`-----token provided from client ${token}, room - ${roomId} ----`);
    const { adminToken } = lobbiesData.find(lobby => lobby.lobbyId == roomId);
    adminToken === token ? next() : next(new Error('unauthorized access'));
  });

  adminSpace.on(EVENTS.connection, (socket) => {
    console.log(`----User connected adminSpace with id: ${socket.id}----`);
    console.log(`//-----token provided from client ${socket.handshake.auth.token}----//`);

    // socket.on(EVENTS.CLIENT.AUTH_ADMIN, (userData) => {
    //   // const { token, roomId, userRole, username, lastName, jobPosition } = userData;
    //   // console.log(userData);
    //   // console.log('-------------');
    //   // console.log(lobbiesData);
    //   // console.log('-------------');
    //   createUser(userData, lobbiesData);
    //   // console.log('-------------');
    //   // console.log(lobbiesData);
    //   // console.log('-------------');
    // })

    socket.on(EVENTS.disconnect, () => {
      console.log(`----User DISCONNECTED adminSpace with id: ${socket.id} ----`);
    });
    
  });

  io.on(EVENTS.connection, (socket) => {
    console.log(`----User connected to mainSpace with id: ${socket.id}----`);

    socket.on(EVENTS.CLIENT.JOIN_LOBBY, ({ socketId, userRole, roomId }, callback) => {
      socket.join(roomId);
      console.log(`client with id: ${socketId}, role: ${userRole} joining room: ${roomId}`);
      callback({
        msg: `you successfully joined room: ${roomId}`,
        isJoinedRoom: true,
      });
      socket.to(roomId).emit(EVENTS.SERVER.USER_JOIN, 
        `user with id: ${socket.id} and role: ${userRole} joined to your room: ${roomId}`);
    });

    socket.on(EVENTS.disconnect, () => {
      console.log(`----User DISCONNECTED mainSpace with id: ${socket.id} ----`);
    });
    // io.emit('server-kek', {message: 'keking from the server'});

    // socket.on(EVENTS.CLIENT.ACCESS_REQ, ({ roomId, userRole }) => {
    //   console.log(`user id: ${socket.id} requesting access to room: ${roomId} as ${userRole}`);
    //   const userSocketId = socket.id;
    //   const users = lobbiesData.find(lobby => lobby.lobbyId === roomId).users;
    //   const adminId = users.find(user => user.userRole === 'ADMIN').socketId;
    //   // console.log('--//--');
    //   // console.log(adminId);
    //   // console.log('--//--');

    //   adminSpace.to(adminId).emit(EVENTS.SERVER.PENDING_USER, { userSocketId, userRole });
    // });

    // socket.on('lobby-connect', (msg) => {
    //   console.log(msg);
    // })

    // socket.on('lobby-create', (msg) => {
    //   console.log(msg);
    //   socket.emit('sending', 'you have joined the room');
    // })


    

  });

  

  // io.on('connection', (socket) => {
//   console.log(socket.id + ' connected to server');
//   socket.on('disconnect', () => {
//     console.log('user disconnected ' + socket.id);
//   });
// });
};

export default socketInit;