import React from 'react';

import messenger from '../../assets/images/Messenger.svg';
import logo from '../../assets/images/Logo.svg';

import style from './Header.module.scss';

const Header: React.FC = (): JSX.Element => {
  const hundlerChat = () => {
    console.log('openchat');
  };
  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <img
          className={style.logoPicture}
          src={logo}
          alt="logo pictures"
          draggable={false}
        />
        <img
          className={style.messengerPicture}
          src={messenger}
          alt="messenger pictures"
          draggable={false}
          aria-hidden="true"
          onClick={() => hundlerChat()}
        />
      </div>
    </header>
  );
};

export default Header;
