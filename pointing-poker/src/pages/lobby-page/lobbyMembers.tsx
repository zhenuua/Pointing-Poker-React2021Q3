import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import style from './Lobby-page.module.scss';

import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';

const LobbyMain: React.FC = (): JSX.Element => {
  const { users } = useTypedSelector((state) => state.lobbySlice);
  const { socketId } = useTypedSelector((state) => state.userSlice);

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
            />
          );
        })}
        {/* <PersonalDataTab
          userImage={authorTest}
          userName="John Smith"
          userStaff="Agent 007"
          isCurrentUser
          isRemove
        />
        <PersonalDataTab
          userImage={authorTest}
          userName="Tim Cook"
          userStaff="senior software"
          isCurrentUser
          isRemove={false}
        />
        <PersonalDataTab
          userImage={dambldorImage}
          userName="Альбус Персиваль Вульфрик Брайан Дамблдор"
          userStaff="Director"
          isCurrentUser={false}
          isRemove
        />
        <PersonalDataTab
          userImage={authorTest}
          userName="John Smith"
          userStaff="Agent 007"
          isCurrentUser
          isRemove
        /> */}
      </div>
    </section>
  );
};

export default LobbyMain;
