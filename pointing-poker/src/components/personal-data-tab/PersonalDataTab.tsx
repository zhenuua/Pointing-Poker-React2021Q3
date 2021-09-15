import React from 'react';

import Marquee from 'react-double-marquee';

import style from './Personal-data-tab.module.scss';

import RemoveIcon from '../../assets/images/Remove-icon.svg';

type PersonalDataTabType = {
  userImage: string,
  userName: string,
  userStaff: string,
  isCurrentUser: boolean,
  isRemove: boolean,
};

const PersonalDataTab: React.FC<PersonalDataTabType> = ({
  userImage,
  userName,
  userStaff,
  isCurrentUser,
  isRemove,
}): JSX.Element => {
  return (
    <div className={style.userTab}>
      <img className={style.userImg} src={userImage} alt="user icon" />
      {isRemove ? (
        <img className={style.removeIcon} src={RemoveIcon} alt="remove icon" />
      ) : (
        ''
      )}
      {isCurrentUser ? (
        <p className={style.itsYou}>It&#8242;s you</p>
      ) : (
        <p className={style.itsYou} />
      )}
      <p className={style.staff}>{userStaff}</p>
      <div className={style.marquee} title={userName}>
        <Marquee direction="left" scrollWhen="overflow">
          {userName}
        </Marquee>
      </div>
    </div>
  );
};

export default PersonalDataTab;
