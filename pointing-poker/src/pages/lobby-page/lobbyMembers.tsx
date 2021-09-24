import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import style from './Lobby-page.module.scss';

import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';

const LobbyMain: React.FC = (): JSX.Element => {
  const { users } = useTypedSelector((state) => state.lobbySlice);
  const { socketId, userRole } = useTypedSelector((state) => state.userSlice);
  const { socket } = useSocketsContext();

  const deleteUser = (id: string) => {
    switch (userRole) {
      case UserRoles.USER_ADMIN:
        {
          socket.emit(EVENTS.CLIENT.FORCE_DEL_USER, id);
          console.log(`you deleted user: ${id}`);
        }
        break;
      case UserRoles.USER_PLAYER:
        {
          socket.emit(EVENTS.CLIENT.VOTE_DEL_USER, { voterId: socketId, suspectId: id });
          console.log(`you vote for deleting of user: ${id}`);
        }
        break;
    }
  };

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
              isRemove={!(user.socketId === socketId)}
              key={`${user.socketId}`}
              socketId={user.socketId}
              deleteUser={deleteUser}
            />
          );
        })}
      </div>
    </section>
  );
};

export default LobbyMain;
