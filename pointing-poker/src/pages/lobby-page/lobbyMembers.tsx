import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import style from './Lobby-page.module.scss';

import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';
import { deleteUser } from '../../store/reducers/lobbySlice';
import { BanPopUpContainer } from './banPopUpContainer';

const LobbyMain: React.FC = (): JSX.Element => {
  const { users, banCandidates } = useTypedSelector((state) => state.lobbySlice);
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { socket } = useSocketsContext();
  const dispatch = useDispatch();

  const handleDeleteUser = (id: string, role: string) => {
    switch (userRole) {
      case UserRoles.USER_ADMIN: {
        dispatch(deleteUser({ userRole: role, socketId: id }));
        console.log(`you deleted user: ${id}`);
        socket.emit(EVENTS.CLIENT.FORCE_DEL_USER, { id, roomId });
        break;
      }
      case UserRoles.USER_PLAYER: {
        socket.emit(EVENTS.CLIENT.INIT_DEL_USER, {
          initiatorId: socketId,
          candidateId: id,
          roomId,
        });
        console.log(`you vote for deleting of user with id: ${id}`);
        break;
      }
    }
  };

  const playerCounter = () => {
    let playerCount = 0;
    users.forEach((user) => {
      if (
        user.userRole === UserRoles.USER_PLAYER ||
        user.userRole === UserRoles.USER_ADMIN
      )
        playerCount += 1;
    });
    return playerCount;
  };

  useEffect(() => {
    if (userRole !== UserRoles.USER_ADMIN) return;
    const playerCount = playerCounter();
    banCandidates.forEach((candidate) => {
      const votesCount = candidate.voters.length;
      if (playerCount > 3 && votesCount >= Math.floor(playerCount / 2) + 1) {
        const bannedUser = users.find((user) => user.socketId === candidate.id);
        bannedUser &&
          dispatch(
            deleteUser({
              userRole: bannedUser.userRole,
              socketId: bannedUser.socketId,
            }),
          );
        console.log(`you deleted user: ${bannedUser?.socketId}`);
        bannedUser &&
          socket.emit(EVENTS.CLIENT.FORCE_DEL_USER, {
            id: bannedUser.socketId,
            roomId,
          });
      }
    });
  }, [banCandidates]);

  return (
    <section className={style.lobbyMembers}>
      <h2 className={`${style.lobbyText} ${style.lobbyTextTitle}`}>Members:</h2>
      <div className={style.lobbyMembers__members}>
        {users.map((user) => {
          if (user.userRole === UserRoles.USER_ADMIN) return null;
          return (
            <PersonalDataTab
              userImage={authorTest}
              userName={user.username}
              lastName={user.lastName}
              userStaff={user.jobPosition}
              isCurrentUser={user.socketId === socketId}
              isRemove={!(user.socketId === socketId) && playerCounter() > 3}
              key={`${user.socketId}`}
              socketId={user.socketId}
              userRole={user.userRole}
              deleteUser={handleDeleteUser}
            />
          );
        })}
      </div>
      <BanPopUpContainer />
      {/* {userRole === UserRoles.USER_ADMIN ? (
        <div className={style.kostylDiv}>{banCandidates.length}</div>
      ) : null} */}
    </section>
  );
};

export default LobbyMain;
