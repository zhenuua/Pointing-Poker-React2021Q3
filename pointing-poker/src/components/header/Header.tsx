import React from 'react';

import { useSelector } from 'react-redux';
import logo from '../../assets/images/Logo.svg';
import ButtonIconChat from '../buttonIconChat/ButtonIconChat';
import { RootState } from '../../store/store';

import style from './Header.module.scss';
import LobbyChat from '../lobby-chat/lobbyChat';

const Header: React.FC = (): JSX.Element => {
  const { chatIconVisible } = useSelector((state: RootState) => state.controlSlice);
  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <img
          className={style.logoPicture}
          src={logo}
          alt="logo pictures"
          draggable={false}
        />
        {chatIconVisible ? (
          <>
            <ButtonIconChat />
            <LobbyChat />
          </>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
