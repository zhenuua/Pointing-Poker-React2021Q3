/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonSubmit from '../../components/buttonSubmit/ButtonSubmit';
import ButtonCancel from '../../components/buttonCancel/ButtonCancel';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import pencil from '../../assets/icons/pencil.svg';
import style from './Lobby-page.module.scss';
import authorTest from '../../assets/images/ImageUser.png';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { useSocketsContext } from '../../context/socket.context';
import {
  cancelGame,
  fetchGameSettings,
  fetchIssues,
  postSettingsIssues,
} from '../../store/reducers/lobbySlice';
import { EVENTS } from '../../store/types/sockeIOEvents';

const LobbyMain: React.FC = (): JSX.Element => {
  const { users } = useTypedSelector((state) => state.lobbySlice);
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { gameSettings, issues } = useTypedSelector((state) => state.lobbySlice);
  const { socket } = useSocketsContext();
  const dispatch = useDispatch();
  const history = useHistory();

  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);

  const startGame = () => {
    console.log('game is start');
    dispatch(
      postSettingsIssues({
        roomId,
        gameSettings,
        issues,
        emitEvent: () => {
          // console.log('kek after posting settings and issues');
          socket.emit(EVENTS.CLIENT.GAME_STARTING, { roomId });
        },
      }),
    );
    history.push(`/game-page/${roomId}`);
  };
  const cancelGameHandler = () => {
    socket.emit(EVENTS.CLIENT.CANCEL_GAME, { roomId });
    dispatch(cancelGame({ roomId }));
    history.goBack();
  };
  const exitGame = () => {
    console.log('exiting lobby/game');
    socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled: false, userRole });
    history.goBack();
    console.log('going back in history');
  };
  const copyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3000/${roomId}`);
  };

  useEffect(() => {
    socket.on(EVENTS.SERVER.GAME_CANCLED, ({ gameCanceled }) => {
      socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled });
      history.goBack();
    });
    socket.on(EVENTS.SERVER.FETCH_GAME_DATA, (msg) => {
      console.log(msg);
      dispatch(fetchGameSettings({ roomId }));
      dispatch(fetchIssues({ roomId }));
      history.push(`/game-page/${roomId}`);
    });
  }, []);

  return (
    <section className={style.lobbyMain}>
      <div className={style.lobbyMain__title}>
        <h2 className={style.lobbyText}>
          Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)
        </h2>
        <img
          className={style.lobbyMain__title__settings}
          src={pencil}
          alt="title settings"
        />
      </div>
      <div className={style.lobbyMain__master}>
        <h3 className={style.lobbyTitle__text__scrum}>Scram master:</h3>
        {admin ? (
          <PersonalDataTab
            userImage={admin.avatarImg ? admin.avatarImg : authorTest}
            userName={admin ? admin.username : 'no admin data'}
            lastName={admin ? admin.lastName : 'no admin data'}
            userStaff={admin ? admin.jobPosition : 'no admin data'}
            isCurrentUser={socketId === admin?.socketId}
            isRemove={false}
          />
        ) : null}
      </div>
      {userRole === UserRoles.USER_ADMIN ? (
        <div className={style.lobbyMain__link}>
          <h3 className={style.lobbyTitle__text__link}>Link to lobby:</h3>
          <div className={style.lobbyMain__link__copy}>
            <label htmlFor="link">
              <input
                className={style.lobbyMain__link__input}
                id="link"
                type="text"
                value={`http://localhost:3000/${roomId}`}
              />
            </label>
            <ButtonSubmit
              onclickHandler={() => {
                copyLink();
              }}
              text="Copy"
            />
          </div>
        </div>
      ) : null}

      <div className={style.lobbyMain__control}>
        {userRole === UserRoles.USER_ADMIN ? (
          <>
            <ButtonSubmit
              onclickHandler={() => {
                startGame();
              }}
              text="Start Game"
            />
            <ButtonCancel
              onclickHandler={() => {
                cancelGameHandler();
              }}
              text="Cancel game"
            />
          </>
        ) : (
          <ButtonCancel
            onclickHandler={() => {
              exitGame();
            }}
            text="Exit"
          />
        )}
      </div>
    </section>
  );
};

export default LobbyMain;
