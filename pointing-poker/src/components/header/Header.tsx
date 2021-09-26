import React from 'react';

import messenger from '../../assets/images/Messenger.svg';
import logo from '../../assets/images/Logo.svg';

import style from './Header.module.scss';
import ButtonIconChat from '../buttonIconChat/ButtonIconChat';

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
        <ButtonIconChat />
      </div>
    </header>
  );
};

export default Header;
