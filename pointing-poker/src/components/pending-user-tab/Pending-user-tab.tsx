import React, { useState } from 'react';

import Marquee from 'react-double-marquee';
import PopUp from '../popup/PopUp';

import RemoveIcon from '../../assets/images/Remove-icon.svg';
import FormKickPlayer from '../form-kick-player/FormKickPlayer';

import { IPendingUserTab, PersonalDataTabType } from '../../types/types';

import style from './pending-user-tab.module.scss';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import { state } from '../../pages/main/main-config';

const PendingUserDataTab: React.FC<IPendingUserTab> = ({
  userImage,
  userName,
  lastName,
  userStaff,
  isCurrentUser,
  isRemove,
  socketId,
  userRole,
  deleteUser,
  addUser,
}): JSX.Element => {
  const [popUpCick, setPopUpCick] = useState<boolean>(false);

  return (
    <div className={style.userTab}>
      <img className={style.userImg} src={userImage} alt="user icon" />
      {isRemove ? (
        <>
          <img
            onClick={() => {
              socketId && addUser(socketId);
            }}
            className={style.addIcon}
            src={RemoveIcon}
            alt="add icon"
            aria-hidden="true"
          />
          <img
            onClick={() => {
              // setPopUpCick(true);
              if (socketId && userRole && deleteUser) deleteUser(socketId, userRole);
            }}
            className={style.removeIcon}
            src={RemoveIcon}
            alt="remove icon"
            aria-hidden="true"
          />
        </>
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
          {`${userName} ${lastName}`}
        </Marquee>
      </div>
      {/* <PopUp active={popUpCick} setActive={setPopUpCick}>
        <FormKickPlayer
          onSubmitHandler={() => {
            setPopUpCick(false);
            if (socketId && userRole && deleteUser) deleteUser(socketId, userRole);
          }}
          onCancelHandler={() => {
            setPopUpCick(false);
          }}
          namePlayer={userName}
        />
      </PopUp> */}
    </div>
  );
};

export default PendingUserDataTab;
