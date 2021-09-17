import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import PendingUser from '../../components/pending-user/pendingUser';
import useSockets from '../../hooks/useSockets';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';

interface ParamsQueries {
  lobbyId: string;
}

interface LobbyPageProps {
  lobbyId?: string;
  userName: string;
}

export const LobbyPage: React.FC = () => {
  const { username, roomId, userRole, token, lastName, socketId } = useTypedSelector((state) => state.userSlice);
  // const { roomId: roooom, userRole: roleeee } = useSockets();

  return (
    <>
      <h1>you are currently in room #{roomId}</h1>
      {userRole === UserRoles.USER_ADMIN ? (
        <>
          <h3>you are an admin</h3>
          <div>
            <p>pending users</p>
            <ul>
              {/* {pendingUsers.map((user, index) => {
                const key = `kek+${index}`;
                return (
                  <li key={key}>
                    <PendingUser />
                  </li>
                );
              })} */}
            </ul>
          </div>
        </>
      ) : (
        <div>palyer/spactator, pls w8 for admin to enter u</div>
      )}
    </>
  );
};

// const { lobbyId } = useParams<ParamsQueries>();

// useEffect(() => {
//   const socket = io('http://localhost:5000/');
//   socket.on('connect', () => {
//     console.log(`you connected to server with id ${socket.id}`);
//     // socket.emit('join lobby', lobbyId);
//   });
//   return () => {
//     socket.disconnect();
//   };
// }, []);
