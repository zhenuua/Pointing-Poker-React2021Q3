import React from 'react';

import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';

import userImage from '../../assets/images/Avatar(Auto).png';
import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';

import style from './Game-page.module.scss';

const GamePage: React.FC = (): JSX.Element => {
  return (
    <div className={style.gamePageWrapper}>
      <h1 className={style.gamePageHeader}>Game Page</h1>
      <div>
        <PersonalDataTab
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
      </div>
    </div>
  );
};

export default GamePage;
