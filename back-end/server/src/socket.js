import { createUser } from "./z-unneccesary-files/lobby.js";
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
    FORCE_DEL_USER: "FORCE_DEL_USER",
    INIT_DEL_USER: "INIT_DEL_USER",
    BAN_VOTE_SUPPORTED: "BAN_VOTE_SUPPORTED",
    BANNED_USER_LEAVE: "BANNED_USER_LEAVE",
    CANCEL_GAME: "CANCEL_GAME",
    USER_LEAVE: "USER_LEAVE",
    GAME_STARTING: "GAME_STARTING",
    NEW_CURISSUE: "NEW_CURISSUE",
    START_ROUND: "START_ROUND",
    END_ROUND: "END_ROUND",
    SCORE_VALUE_CURRENT_USER: "SCORE_VALUE_CURRENT_USER",
    RESTART_ROUND: "RESTART_ROUND",
    NEXT_ISSUE: "NEXT_ISSUE",
    GAME_IS_OVER: "GAME_IS_OVER",
    ADD_TITLE_LOBBY: "ADD_TITLE_LOBBY",
    PENDING_USER: 'PENDING_USER',
    ACCESS_PENDING_USER: 'ACCESS_PENDING_USER',
    GAME_ADD_ISSUE: 'GAME_ADD_ISSUE',
    UPDATE_PLAYER: 'UPDATE_PLAYER',
  },
  SERVER: {
    LOBBIES: "LOBBIES",
    JOINED_LOBBY: "JOINED_LOBBY",
    LOBBY_MESSAGE: "LOBBY_MESSAGE",
    USER_JOIN: "USER_JOIN",
    PENDING_USER: "PENDING_USER",
    USER_DELETED: "USER_DELETED",
    USER_BAN_VOTE: "USER_BAN_VOTE",
    GAME_CANCLED: "GAME_CANCLED",
    FETCH_GAME_DATA: "FETCH_GAME_DATA",
    SET_CURISSUE: "SET_CURISSUE",
    START_ROUND: "START_ROUND",
    SCORE_VALUE_CURRENT_USER: "SCORE_VALUE_CURRENT_USER",
    END_ROUND: "END_ROUND",
    RESTART_ROUND: "RESTART_ROUND",
    NEXT_ISSUE: "NEXT_ISSUE",
    GAME_IS_OVER: "GAME_IS_OVER",
    ADD_TITLE_LOBBY: "ADD_TITLE_LOBBY",
    PENDING_USER_REQ: 'PENDING_USER_REQ',
    PENDING_USER_RES: "PENDING_USER_RES",
    GAME_ADD_ISSUE: 'GAME_ADD_ISSUE',
    UPDATE_PLAYERR: 'UPDATE_PLAYERR',
  },
};

const socketInit = ({ io }) => {
  console.log("----SOCKETS ENABLED----");

  const adminSpace = io.of("/admin");

  adminSpace.use((socket, next) => {
    const combinedToken = socket.handshake.auth.token.split(" ");
    const [token, roomId] = combinedToken;
    console.log(
      `-----token provided from client ${token}, room - ${roomId} ----`
    );
    const { adminToken } = lobbiesData.find((lobby) => lobby.lobbyId == roomId);
    adminToken === token ? next() : next(new Error("unauthorized access"));
  });

  adminSpace.on(EVENTS.connection, (socket) => {
    console.log(`----User connected adminSpace with id: ${socket.id}----`);
    console.log(
      `//-----token provided from client ${socket.handshake.auth.token}----//`
    );

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
      console.log(
        `----User DISCONNECTED adminSpace with id: ${socket.id} ----`
      );
    });
  });

  io.on(EVENTS.connection, (socket) => {
    console.log(`----User connected to mainSpace with id: ${socket.id}----`);

    // ------------------RoundOn-----------------------

    socket.on(EVENTS.CLIENT.START_ROUND, ({ roomId, roundOn }) => {
      console.log(roomId, roundOn);
      socket.to(roomId).emit(EVENTS.SERVER.START_ROUND, {
        roundOn,
      });
    });

    socket.on(
      EVENTS.CLIENT.SCORE_VALUE_CURRENT_USER,
      ({ card, socketId, curScoreIndex, roomId }) => {
        console.log(card, socketId, curScoreIndex);
        socket.to(roomId).emit(EVENTS.SERVER.SCORE_VALUE_CURRENT_USER, {
          card,
          socketId,
          curScoreIndex,
        });
      }
    );

    // ------GameIsOver---------

    socket.on("GAME_IS_OVER", ({ isCancelGame, roomId }) => {
      console.log(isCancelGame);
      socket.to(roomId).emit("GAME_IS_OVER_ALL", {
        isCancelGame,
      });
    });

    socket.on(EVENTS.CLIENT.END_ROUND, ({ roundOn, roomId }) => {
      console.log(roundOn);
      socket.to(roomId).emit(EVENTS.SERVER.END_ROUND, {
        roundOn,
      });
    });

    // ---------------RestartRound---------------------

    socket.on(
      EVENTS.CLIENT.RESTART_ROUND,
      ({ roomId, curScoreIndex, curIssue }) => {
        socket.to(roomId).emit(EVENTS.SERVER.RESTART_ROUND, {
          curScoreIndex,
          curIssue,
        });
      }
    );

    // ---------------NextIssue------------------------

    socket.on(EVENTS.CLIENT.NEXT_ISSUE, ({ roomId, nextIssueValue }) => {
      socket.to(roomId).emit(EVENTS.SERVER.NEXT_ISSUE, {
        nextIssueValue,
      });
    });

    socket.on(EVENTS.CLIENT.ADD_TITLE_LOBBY, ({ isTitleLobby, roomId }) => {
      socket.to(roomId).emit(EVENTS.SERVER.ADD_TITLE_LOBBY, {
        isTitleLobby,
      });
    });

    // ------------------------------------------------

    socket.on(EVENTS.CLIENT.JOIN_LOBBY, ({ userRole, roomId }, callback) => {
      socket.join(roomId);
      console.log(
        `client with id: ${socket.id}, role: ${userRole} joining room: ${roomId}`
      );
      callback({
        msg: `you successfully joined room: ${roomId}`,
        isJoinedRoom: true,
      });
      socket.to(roomId).emit(EVENTS.SERVER.USER_JOIN, {
        msg: `user with id: ${socket.id} and role: ${userRole} joined to your room: ${roomId}`,
        newUser: {
          userRole,
          socketId: socket.id,
        },
      });
    });

    socket.on(EVENTS.CLIENT.FORCE_DEL_USER, ({ id, roomId }) => {
      console.log(`force delete from admin of user id: ${id}`);
      socket.to(roomId).emit(EVENTS.SERVER.USER_DELETED, {
        msg: `user with id: ${id} deleted from your room: ${roomId}`,
        socketId: id,
      });
    });

    socket.on(
      EVENTS.CLIENT.INIT_DEL_USER,
      ({ initiatorId, candidateId, roomId }) => {
        console.log(
          `${initiatorId} initiated deletion of user id: ${candidateId} in room: ${roomId}`
        );
        socket.to(roomId).emit(EVENTS.SERVER.USER_BAN_VOTE, {
          initiatorId,
          candidateId,
          roomId,
          originInitiator: true,
        });
      }
    );

    socket.on(
      EVENTS.CLIENT.BAN_VOTE_SUPPORTED,
      ({ initiatorId, candidateId, lobbyId, adminId }) => {
        console.log(
          `${initiatorId} supported deletion of user id: ${candidateId} in room: ${lobbyId}`
        );
        io.to(adminId).emit(EVENTS.SERVER.USER_BAN_VOTE, {
          initiatorId,
          candidateId,
          roomId: lobbyId,
          originInitiator: false,
        });
      }
    );

    socket.on(EVENTS.CLIENT.BANNED_USER_LEAVE, ({ roomId }) => {
      socket.leave(roomId);
      socket.removeAllListeners();
      console.log(`banned user id: ${socket.id} has left room: ${roomId}`);
    });

    // console.log(io.of('/').sockets.clients(roomId)); - this is an attempt to acquire all connected users' socketIds
    // further search needed for event below
    socket.on(EVENTS.CLIENT.CANCEL_GAME, ({ roomId }) => {
      console.log(`game ${roomId} canceled by admin: ${socket.id}`);
      socket
        .to(roomId)
        .emit(EVENTS.SERVER.GAME_CANCLED, { gameCanceled: true });
      socket.leave(roomId);
      // socket.removeAllListeners();
    });

    socket.on(
      EVENTS.CLIENT.USER_LEAVE,
      ({ roomId, gameCanceled, userRole }) => {
        if (gameCanceled) {
          socket.leave(roomId);
          // socket.removeAllListeners();
          return;
        }

        socket.to(roomId).emit(EVENTS.SERVER.USER_DELETED, {
          msg: `user with id: ${socket.id} has left your room: ${roomId}`,
          socketId: socket.id,
          userRole,
        });
        socket.leave(roomId);

        // socket.removeAllListeners();
      }
    );

    socket.on(EVENTS.CLIENT.GAME_STARTING, ({ roomId }) => {
      socket
        .to(roomId)
        .emit(
          EVENTS.SERVER.FETCH_GAME_DATA,
          "admin started the game; fetching gamesettings and issues..."
        );
    });

    socket.on(EVENTS.CLIENT.NEW_CURISSUE, ({ roomId, issueTitle }) => {
      socket.to(roomId).emit(EVENTS.SERVER.SET_CURISSUE, { issueTitle });
    });

    socket.on(EVENTS.disconnect, () => {
      console.log(`----User DISCONNECTED mainSpace with id: ${socket.id} ----`);
    });

    // Chat

    socket.on(
      "SEND_MESSAGE",
      ({
        currentMessage,
        socketId,
        roomId,
        username,
        avatarImg,
        lastName,
        jobPosition,
      }) => {
        console.log(currentMessage, socketId, avatarImg);
        socket.to(roomId).emit("ADD_MESSAGE", {
          currentMessage,
          socketId,
          roomId,
          username,
          avatarImg,
          lastName,
          jobPosition,
        });
      }
    );

    // handling joining the game during gameOn
    socket.on(EVENTS.CLIENT.PENDING_USER, ({ roomId, socketId, userRole, username, lastName }) => {
      socket.to(roomId).emit(EVENTS.SERVER.PENDING_USER_REQ, {
        socketId,
        userRole,
        username,
        lastName,
      });
    });
    socket.on(EVENTS.CLIENT.ACCESS_PENDING_USER, ({ socketId, access, roomId }) => {
      io.to(socketId).emit(EVENTS.SERVER.PENDING_USER_RES, { access, roomId });
    });
    socket.on(EVENTS.CLIENT.UPDATE_PLAYER, ({ players, socketId }) => {
      players.forEach((player, index) => console.log(`player are --- ${player}`));
      console.log(socketId);
      io.to(socketId).emit(EVENTS.SERVER.UPDATE_PLAYERR, { players, id: socketId });
    });

    // adding issues during gameOn
    socket.on(EVENTS.CLIENT.GAME_ADD_ISSUE, ({
      roomId,
      issue, 
    }) => {
      socket.to(roomId).emit(EVENTS.SERVER.GAME_ADD_ISSUE, { issue });
    });
    
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

  // io.on('connection', (socket) => {
  //   console.log(socket.id + ' connected to server');
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected ' + socket.id);
  //   });
  // });
};

export default socketInit;
