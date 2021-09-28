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
import { cancelGame } from '../../store/reducers/lobbySlice';
import { EVENTS } from '../../store/types/sockeIOEvents';

const LobbyMain: React.FC = (): JSX.Element => {
  const { users } = useTypedSelector((state) => state.lobbySlice);
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { socket } = useSocketsContext();
  const dispatch = useDispatch();
  const history = useHistory();

  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);

  const [link, setLink] = useState<string>(`http://localhost:3000/${roomId}`);
  const [isGame, setIsGame] = useState<boolean>(false);

  const startGame = () => {
    console.log('game is start');
    setIsGame(true);
  };
  const cancelGameHandler = () => {
    socket.emit(EVENTS.CLIENT.CANCEL_GAME, { roomId });
    setIsGame(false);
    dispatch(cancelGame({ roomId }));
    history.goBack();
  };
  const exitGame = () => {
    console.log('exiting lobby/game');
    setIsGame(false);
    socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled: false, userRole });
    history.goBack();
  };
  const copyLink = () => {
    console.log('copy link');
    navigator.clipboard.writeText(link);
  };

  useEffect(() => {
    socket.on(EVENTS.SERVER.GAME_CANCLED, ({ gameCanceled }) => {
      socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled });
      history.goBack();
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
                value={link}
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
