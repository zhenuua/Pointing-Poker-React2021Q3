import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import LobbyMain from './lobbyMain';
import LobbyMembers from './lobbyMembers';
import LobbySettings from './lobbySettings';
import LobbyIssues from './lobbyIssues';
import LobbyCards from './lobbyCards';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { createAdmin } from '../../store/actionCreators/lobbyActionCreators';
import { createPlayer } from '../../store/reducers/userSlice';
import { deleteUser, fetchUser, removeUser } from '../../store/reducers/lobbySlice';
import LobbyChat from '../../components/lobby-chat/lobbyChat';

import style from './Lobby-page.module.scss';

const LobbyPage: React.FC = (): JSX.Element => {
  const { socket } = useSocketsContext();
  const { userRole, socketId, roomId, username, lastName, jobPosition, avatarImg } =
    useTypedSelector((state) => state.userSlice);
  const userData = {
    userRole,
    socketId,
    roomId,
    username,
    lastName,
    jobPosition,
    avatarImg,
  };
  const dispatch = useDispatch();

  // <------------- joining lobby on page load-------->
  useEffect(() => {
    // <-------------- handling joinnig the lobby --------->

    const emitJoinLobby = () => {
      // telling everyone else in the room that you're joining the room
      socket.emit(
        EVENTS.CLIENT.JOIN_LOBBY,
        { userRole, roomId },
        ({ msg, isJoinedRoom }: { msg: string, isJoinedRoom: boolean | null }) => {
          console.log(msg);
          if (!isJoinedRoom) {
            console.log(new Error('unable to join the room'));
            alert('unable to join the room');
          }
        },
      );
    };

    const createUser = async () => {
      if (userRole !== UserRoles.USER_ADMIN) {
        dispatch(createPlayer({ userData, emitSocketEvent: emitJoinLobby }));
        // dispatch(fetchUsers({ roomId })); - envoloped this into createPlayer
      } else {
        dispatch(createAdmin({ userData, emitSocketEvent: emitJoinLobby }));
      }
    };

    // additional logic for rejecting/accepting player/spectator
    if (userRole !== UserRoles.USER_ADMIN) {
      console.log('additional logic required for non admin users');
    }

    // Creating user
    createUser();

    // <---------------- handling when someone else joins room ------------->
    socket.on(EVENTS.SERVER.USER_JOIN, (req: any) => {
      console.log(req.msg);
      const { newUser } = req;
      console.log(newUser);
      dispatch(fetchUser(newUser));
    });

    // <----------------when user deleted at server or left room ----------------->

    socket.on(EVENTS.SERVER.USER_DELETED, (req: any) => {
      console.log(req.msg);
      console.log(`user deleted on server ${req.socketId}`);
      userRole !== UserRoles.USER_ADMIN
        ? dispatch(removeUser({ socketId: req.socketId }))
        : dispatch(deleteUser({ userRole: req.userRole, socketId: req.socketId }));
      // !!!!!!!!!!inconsistent user deletion, very hard to catch this bug!!!!!!!!!!!!!!!!
    });

    // <-------------------------vote for deleting ---------------->

    // ---------------------------------END-----------------------------------
    // return () => {
    //   socket.removeAllListeners();
    // }
  }, []);
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
