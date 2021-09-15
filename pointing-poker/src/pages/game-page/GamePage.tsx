import React from 'react';

import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';

import userImage from '../../assets/images/Avatar(Auto).png';
import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';

import style from './Game-page.module.scss';
import Card from '../../components/card/Card';

const GamePage: React.FC = (): JSX.Element => {
  return (
    <div className={style.gamePageWrapper}>
      <div className={style.gameWrapperLeft}>1</div>
      <div className={style.gameWrapperRight}>
        <div className={style.scoreColumn}>
          <span className={style.headerText}>Score:</span>
        </div>
        <div className={style.playersColumn}>
          <span className={style.headerText}>Players:</span>
          <div>
            <PersonalDataTab
              userImage={authorTest}
              userName="Tim Cook"
              userStaff="senior software"
              isCurrentUser
              isRemove={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
