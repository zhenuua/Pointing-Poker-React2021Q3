import React from 'react';

import Marquee from 'react-double-marquee';

import RemoveIcon from '../../assets/images/Remove-icon.svg';
import { UserRoles } from '../../store/types/sliceTypes';

import style from './Personal-data-tab-mini.module.scss';

type PersonalDataTabMiniType = {
  userImage?: string,
  userName: string,
  userStaff?: string,
  isCurrentUser?: boolean,
  isRemove?: boolean,
  id?: number,
  setData?: any,
  data?: any,
  userRole?: UserRoles,
};

const PersonalDataTabMini: React.FC<PersonalDataTabMiniType> = ({
  userImage,
  userName,
  userStaff,
  isCurrentUser,
  isRemove,
  id,
  setData,
  data,
  userRole,
}): JSX.Element => {
  return (
    <div className={style.userTab}>
      <img className={style.userImg} src={userImage} alt="user icon" />
      {isRemove ? (
        <img
          className={style.removeIcon}
          src={RemoveIcon}
          alt="remove icon"
          onClick={() => setData(data.filter((el: any) => el.id !== id))}
          aria-hidden="true"
        />
      ) : (
        ''
      )}
      {isCurrentUser ? (
        <p className={style.itsYou}>It&#8242;s you ({userRole})</p>
      ) : (
        <p className={style.itsYou}>{userRole}</p>
      )}
      <p className={style.staff}>{userStaff}</p>
      <div className={style.marquee} title={userName}>
        <Marquee direction="left" scrollWhen="overflow" speed={0.01}>
          {userName}
        </Marquee>
      </div>
    </div>
  );
};

export default PersonalDataTabMini;
