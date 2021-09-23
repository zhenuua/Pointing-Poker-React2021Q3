import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import style from './Lobby-page.module.scss';

import LobbyMain from './lobbyMain';
import LobbyMembers from './lobbyMembers';
import LobbySettings from './lobbySettings';
import LobbyIssues from './lobbyIssues';
import LobbyCards from './lobbyCards';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import {
  createAdmin,
  createPlayer,
  fetchUsers,
} from '../../store/actionCreators/lobbyActionCreators';
import LobbyChat from '../../components/lobby-chat/lobbyChat';

const LobbyPage: React.FC = (): JSX.Element => {
  const { socket } = useSocketsContext();
  const { userRole, socketId, roomId, username, lastName, jobPosition, avatarImg } =
    useTypedSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  // joining lobby on page load
  // useEffect(() => {
  //   // <-------------- handling joinnig the lobby --------->
  //   if (userRole !== UserRoles.USER_ADMIN) {
  //     console.log('additional logic required for non admin users');
  //   }
  //   socket.emit(
  //     EVENTS.CLIENT.JOIN_LOBBY,
  //     { socketId, userRole, roomId },
  //     ({ msg, isJoinedRoom }: { msg: string, isJoinedRoom: boolean | null }) => {
  //       console.log(msg);
  //       if (!isJoinedRoom) {
  //         console.log(new Error('unable to join the room'));
  //         alert('unable to join the room');
  //         return; // !!!!!!!! here could be a potential bug !!!!!!!!
  //       }

  //       console.log('fetching users...');
  //       if (userRole !== UserRoles.USER_ADMIN) {
  //         dispatch(
  //           createPlayer({
  //             userRole,
  //             socketId,
  //             roomId,
  //             username,
  //             lastName,
  //             jobPosition,
  //             avatarImg,
  //           }),
  //         );
  //         // dispatch(fetchUsers({ roomId }));
  //       } else {
  //         dispatch(
  //           createAdmin({
  //             userRole,
  //             socketId,
  //             roomId,
  //             username,
  //             lastName,
  //             jobPosition,
  //             avatarImg,
  //           }),
  //         );
  //       }
  //     },
  //   );
  //   // <---------------- handling when someone else joins room ------------->
  //   socket.on(EVENTS.SERVER.USER_JOIN, (msg: any) => {
  //     console.log(msg);
  //     // !!!!!! bug - fetches palyers too fast for admin, so he doesn't get the last one!!!!!!!!!!
  //     dispatch(fetchUsers({ roomId }));
  //   });
  // }, []);
  return (
    <div className={style.wrapperLobbyPage}>
      <div className={style.wrapperLobby}>
        <LobbyMain />
        <LobbyMembers />
        {userRole === UserRoles.USER_ADMIN && <LobbyIssues />}
        {userRole === UserRoles.USER_ADMIN && <LobbySettings />}
        {userRole === UserRoles.USER_ADMIN && <LobbyCards />}
      </div>
      <LobbyChat />
    </div>
  );
};

export default LobbyPage;
