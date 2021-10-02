import React, { useState } from 'react';

import Marquee from 'react-double-marquee';

import PopUp from '../popup/PopUp';
import FormKickPlayer from '../form-kick-player/FormKickPlayer';

import { PersonalDataTabType } from '../../types/types';

import RemoveIcon from '../../assets/images/Remove-icon.svg';

import style from './Personal-data-tab.module.scss';

const PersonalDataTab: React.FC<PersonalDataTabType> = ({
  userImage,
  userName,
  lastName,
  userStaff,
  isCurrentUser,
  isRemove,
  socketId,
  userRole,
  deleteUser,
}): JSX.Element => {
  const [popUpKick, setPopUpKick] = useState<boolean>(false);

  return (
    <div className={style.userTab}>
      <img className={style.userImg} src={userImage} alt="user icon" />
      {isRemove ? (
        <img
          onClick={() => {
            setPopUpKick(true);
          }}
          className={style.removeIcon}
          src={RemoveIcon}
          alt="remove icon"
          aria-hidden="true"
        />
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
          {`${userName} ${lastName || ''}`}
        </Marquee>
      </div>
      <PopUp active={popUpKick} setActive={setPopUpKick}>
        <FormKickPlayer
          onSubmitHandler={() => {
            setPopUpKick(false);
            if (socketId && userRole && deleteUser) deleteUser(socketId, userRole);
          }}
          onCancelHandler={() => {
            setPopUpKick(false);
          }}
          namePlayer={userName}
        />
      </PopUp>
    </div>
  );
};

export default PersonalDataTab;
