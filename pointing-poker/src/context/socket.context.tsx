import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { useHistory } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import {
  setCancelGame,
  setCurCardValueInScorePlayer,
  setCurIssue,
  setRestartRnd,
  setResultsVoted,
  setTitleLobby,
  addPendingUser,
  IPendingUser,
} from '../store/reducers/lobbySlice';
import { EVENTS } from '../store/types/sockeIOEvents';
import { setRoundOn } from '../store/reducers/gameSlice';
import { setChatIconVisible } from '../store/reducers/controlSlice';

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

    socket.on(EVENTS.SERVER.START_ROUND, ({ roundOn }) => {
      dispatch(setRoundOn(roundOn));
    });

    socket.on(
      EVENTS.SERVER.SCORE_VALUE_CURRENT_USER,
      ({ card, socketId, curScoreIndex }) => {
        dispatch(setCurCardValueInScorePlayer({ card, socketId, curScoreIndex }));
      },
    );

    socket.on('GAME_IS_OVER_ALL', ({ isCancelGame }) => {
      dispatch(setCancelGame(isCancelGame));
      dispatch(setChatIconVisible(false));
    });

    socket.on(EVENTS.SERVER.END_ROUND, ({ roundOn }) => {
      console.log(roundOn);
      dispatch(setRoundOn(false));
    });

    socket.on(EVENTS.SERVER.RESTART_ROUND, ({ curScoreIndex, curIssue }) => {
      dispatch(setRestartRnd({ curScoreIndex, curIssue }));
    });

    socket.on(EVENTS.SERVER.NEXT_ISSUE, ({ nextIssueValue }) => {
      dispatch(setCurIssue(nextIssueValue.issueTitle));
    });

    socket.on(EVENTS.SERVER.ADD_TITLE_LOBBY, ({ isTitleLobby }) => {
      dispatch(setTitleLobby(isTitleLobby));
    });

    // -gamePage - pending users
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
// =======
// import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import io, { Socket } from 'socket.io-client';
// import { useHistory } from 'react-router-dom';
// import { useActions } from '../hooks/useActions';
// import { useTypedSelector } from '../hooks/useTypedSelector';
// import { addPendingUser, IPendingUser, setCurIssue } from '../store/reducers/lobbySlice';
// import { EVENTS } from '../store/types/sockeIOEvents';

// interface Context {
//   socket: Socket;
//   adminSocket: Socket | null;
//   playerSocket: Socket | null;
//   chatSocket: Socket | null;
// }
// const SERVER_URL = 'http://localhost:5000/';

// const socket = io(SERVER_URL, {
//   reconnectionAttempts: 3,
//   reconnectionDelay: 2000,
// });

// const SocketsContext = createContext<Context>({
//   socket,
//   adminSocket: null,
//   playerSocket: null,
//   chatSocket: null,
// });

// const SocketsProvider = ({ children }: { children: ReactNode }) => {
//   const { issues } = useTypedSelector((state) => state.lobbySlice);

//   const { setSocketId } = useActions();
//   const dispatch = useDispatch();
//   const history = useHistory();
//   socket.on(EVENTS.connect, () => {
//     console.log(`you have connected to Socket.IO server`);
//     setSocketId(socket.id);
//     // setSocketId(socket.id);
//     // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
//   });

//   useEffect(() => {
//     // ------------- GAME PAGE --------------
//     socket.on(EVENTS.SERVER.SET_CURISSUE, ({ issueTitle }) => {
//       dispatch(setCurIssue(issueTitle));
//     });

//     socket.on(EVENTS.SERVER.PENDING_USER_REQ, (pendingUser: IPendingUser) => {
//       dispatch(addPendingUser(pendingUser));
//     });
//   }, []);

//   return (
//     <SocketsContext.Provider
//       value={{
//         socket,
//         adminSocket: null,
//         playerSocket: null,
//         chatSocket: null,
//       }}
//     >
//       {children}
//     </SocketsContext.Provider>
//   );
// };

// export const useSocketsContext = () => useContext(SocketsContext);

// export default SocketsProvider;

// // socket.on(EVENTS.connect, () => {
// //   console.log(`you have connected to Socket.IO server`);
// //   // setSocketId(socket.id);
// //   // socket.emit(EVENTS.CLIENT.ACCESS_REQ, { roomId, userRole });
// // });
// >>>>>>> 039696bc3cf3081135aadb7018fb5a24387dbb09
