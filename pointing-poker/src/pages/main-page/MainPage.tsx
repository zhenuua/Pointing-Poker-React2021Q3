import React, { useState } from 'react';

import logo from '../../assets/images/Poker-Planning-picture.svg';

import Button from '../../components/button/Button';
import InputComponent from '../../components/input/InputComponent';

import style from './Main-page.module.scss';
import PopUp from '../../components/popup/PopUp';
import Form from '../../components/form/Form';

const MainPage: React.FC = (): JSX.Element => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  return (
    <>
      <div className={style.mainWrapper}>
        <img className={style.mainLogo} src={logo} alt="logo" draggable={false} />
        <div className={style.startPlanning}>
          <p className={style.header}>Start your planning:</p>
          <div className={style.createSessionWrapper}>
            <span className={style.createSessionText}>Create session:</span>
            <div
              className={style.buttonWrapper}
              onClick={() => setModalActive(true)}
              aria-hidden="true"
            >
              <Button text="Start new game" />
            </div>
          </div>
          <div className={style.connectToLobbyWrapper}>
            <p className={`${style.header} ${style.orHeader}`}>OR:</p>
            <span
              className={`${style.createSessionText}
         ${style.connectToLobbyText}`}
            >
              Connect to lobby by <b className={style.connectToLobbyBold}>URL</b>:
            </span>
            <div className={style.inputWrapper}>
              <InputComponent />
            </div>
            <div className={style.buttonWrapper}>
              <Button text="Connect" />
            </div>
          </div>
        </div>
      </div>
      <PopUp active={modalActive} setActive={setModalActive}>
        <Form setActive={setModalActive} />
      </PopUp>
    </>
  );
};

export default MainPage;
