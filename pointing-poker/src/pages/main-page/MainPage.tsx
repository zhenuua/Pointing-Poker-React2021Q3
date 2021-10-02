import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/images/Poker-Planning-picture.svg';

import Button from '../../components/button/Button';
import InputComponent from '../../components/input/InputComponent';
import style from './Main-page.module.scss';
import PopUp from '../../components/popup/PopUp';
import { useResetUser } from '../../hooks/useResetUser';
import ConnectForm from '../../components/connect-form/ConnectForm';
import { RootState } from '../../store/store';
import ErrorWindow from '../../components/error-window/ErrorWindow';
import { setLobbyIdMissing, setServerError } from '../../store/reducers/userSlice';

interface ParamsQueries {
  lobbyParam?: string;
}

const MainPage: React.FC = (): JSX.Element => {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [isConnect, setIsConnect] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { lobbyParam } = useParams<ParamsQueries>();
  const [lobbyLink, setLobbyLink] = useState<string>(`${lobbyParam || ''}`);

  const { lobbyIdMissing, serverError } = useSelector(
    (state: RootState) => state.userSlice,
  );

  // resets userdata, by useEffect
  useResetUser();

  const setActiveStore = (flag: boolean) => {
    if (!flag) {
      dispatch(setLobbyIdMissing(false));
    }
  };

  const setActiveStoreServerError = (flag: boolean) => {
    if (!flag) {
      dispatch(setServerError(false));
    }
  };

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
              onClick={() => {
                setModalActive(true);
                setIsConnect(false);
              }}
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
              <InputComponent setLobbyLink={setLobbyLink} />
            </div>
            <div
              className={style.buttonWrapper}
              onClick={() => {
                setModalActive(true);
                setIsConnect(true);
              }}
              aria-hidden="true"
            >
              <Button text="Connect" />
              {/* <Button text="Connect" onClick={connectLobby} /> */}
            </div>
          </div>
        </div>
      </div>
      <PopUp active={modalActive} setActive={setModalActive}>
        <ConnectForm
          setActive={setModalActive}
          isConnect={isConnect}
          lobbyLink={lobbyLink}
        />
      </PopUp>
      <PopUp active={lobbyIdMissing} setActive={setActiveStore}>
        <ErrorWindow text="Lobby Not Found..." />
      </PopUp>
      <PopUp active={serverError} setActive={setActiveStoreServerError}>
        <ErrorWindow text="Server issue. Unable to create new lobby." />
      </PopUp>
    </>
  );
};

export default MainPage;
