import React, { useState } from 'react';

import Marquee from 'react-double-marquee';
import PopUp from '../popup/PopUp';

import RemoveIcon from '../../assets/images/Remove-icon.svg';
import FormKickPlayer from '../form-kick-player/FormKickPlayer';

import { PersonalDataTabType } from '../../types/types';

import style from './Personal-data-tab.module.scss';

const PersonalDataTab: React.FC<PersonalDataTabType> = ({
  userImage,
  userName,
  userStaff,
  isCurrentUser,
  isRemove,
}): JSX.Element => {
  const [popUpCick, setPopUpCick] = useState<boolean>(false);

  return (
    <div className={style.userTab}>
      <img className={style.userImg} src={userImage} alt="user icon" />
      {isRemove ? (
        <img
          onClick={() => {
            setPopUpCick(true);
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
          {userName}
        </Marquee>
      </div>
      <PopUp active={popUpCick} setActive={setPopUpCick}>
        <FormKickPlayer
          onSubmitHandler={() => {
            setPopUpCick(false);
          }}
          onCancelHandler={() => {
            setPopUpCick(false);
          }}
          namePlayer={userName}
        />
      </PopUp>
    </div>
  );
};

export default PersonalDataTab;
