/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ButtonSubmit from '../../components/buttonSubmit/ButtonSubmit';
import ButtonCancel from '../../components/buttonCancel/ButtonCancel';
import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import style from './Lobby-page.module.scss';
import authorTest from '../../assets/images/ImageUser.png';
import linkCopy from '../../assets/images/Check.png';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { useSocketsContext } from '../../context/socket.context';
import {
  cancelGame,
  fetchGameSettings,
  fetchIssues,
  postSettingsIssues,
  setCancelGame,
} from '../../store/reducers/lobbySlice';
import { EVENTS } from '../../store/types/sockeIOEvents';
import { setChatIconVisible } from '../../store/reducers/controlSlice';
import ErrorWindow from '../../components/error-window/ErrorWindow';
import PopUp from '../../components/popup/PopUp';
import LobbyTitle from '../../components/lobby-title/LobbyTitle';
import { setGameOn, updateGameStatus } from '../../store/reducers/gameSlice';
import { FRONT_URL } from '../../url-config/urls';

const LobbyMain: React.FC = (): JSX.Element => {
  const [startGameFlag, setStartGameFlag] = useState<boolean>(false);
  const [isCheck, setCheck] = useState<boolean>(false);
  const { users, isTitleLobby } = useTypedSelector((state) => state.lobbySlice);
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const {
    gameSettings,
    issues,
    cancelGame: cancelGameStore,
  } = useTypedSelector((state) => state.lobbySlice);

  const { gameOn } = useTypedSelector((state) => state.gameSlice);

  const { socket } = useSocketsContext();
  const dispatch = useDispatch();
  const history = useHistory();
  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);

  const endGame = (flag: boolean) => {
    dispatch(setCancelGame(flag));
  };

  const cancelPlay = () => {
    dispatch(setChatIconVisible(false));
    setTimeout(() => dispatch(setCancelGame(false)), 2000);
  };

  const startGame = async () => {
    if (issues.length === 0 || isTitleLobby.length === 0) {
      setStartGameFlag(true);
      return;
    }
    console.log('game is start');
    await Promise.all([
      dispatch(setGameOn(true)),
      dispatch(updateGameStatus({ roomId, gameOn: true, gameOver: false })),
      dispatch(
        postSettingsIssues({
          roomId,
          gameSettings,
          issues,
        }),
      ),
    ]);
    socket.emit(EVENTS.CLIENT.GAME_STARTING, { roomId });
    history.push(`/game-page/${roomId}`);
    // emitEvent: () => {
    //   // console.log('kek after posting settings and issues');
    //   socket.emit(EVENTS.CLIENT.GAME_STARTING, { roomId });
    // },
  };
  const cancelGameHandler = () => {
    socket.emit(EVENTS.CLIENT.CANCEL_GAME, { roomId });
    dispatch(cancelGame({ roomId }));
    history.push('/');
  };
  const exitGame = () => {
    console.log('exiting lobby/game');
    socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled: false, userRole });
    history.push('/');
    console.log('going back in history');
  };
  const copyLink = () => {
    navigator.clipboard.writeText(`${FRONT_URL}/${roomId}`);
  };
  const dispatchChaining = async () => {
    await Promise.all([
      dispatch(setGameOn(true)),
      dispatch(fetchGameSettings({ roomId })),
      dispatch(fetchIssues({ roomId })),
    ]);
  };

  useEffect(() => {
    socket.on(EVENTS.SERVER.GAME_CANCLED, ({ gameCanceled }) => {
      socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled });
      history.push('/');
    });
    socket.on(EVENTS.SERVER.FETCH_GAME_DATA, (msg) => {
      console.log(msg);
      // dispatch(fetchGameSettings({ roomId }));
      // dispatch(fetchIssues({ roomId }));
      dispatchChaining();
      history.push(`/game-page/${roomId}`);
    });
  }, []);

  // <----------------when you are connecting to already gameOn lobby --------------->
  const awaitFetching = async () => {
    await Promise.all([
      dispatch(fetchGameSettings({ roomId })),
      dispatch(fetchIssues({ roomId })),
    ]);
  };

  useEffect(() => {
    if (gameOn && users.length) {
      // awaitFetching();
      history.push(`/game-page/${roomId}`);
      // const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);
      // admin && socket.emit(EVENTS.CLIENT.CUR_GAMEDATA_ACCESS, {  });
    }
  }, [users]);

  return (
    <section className={style.lobbyMain}>
      <div className={style.lobbyMain__title}>
        <LobbyTitle isScrumMaster={userRole === 'ADMIN'} />
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
            userRole={UserRoles.USER_ADMIN}
          />
        ) : null}
      </div>
      {userRole === UserRoles.USER_ADMIN ? (
        <div className={style.lobbyMain__link}>
          <h3 className={style.lobbyTitle__text__link}>Link to lobby:</h3>
          <div className={style.lobbyMain__link__copy}>
            <label className={style.labelLink} htmlFor="link">
              <input
                className={style.lobbyMain__link__input}
                id="link"
                type="text"
                value={`${FRONT_URL}/${roomId}`}
              />
            </label>
            <ButtonSubmit
              onclickHandler={() => {
                copyLink();
                setCheck(true);
                setTimeout(() => setCheck(false), 500);
              }}
              text="Copy"
            />
            {isCheck ? (
              <div className={style.copyLink}>
                <img className={style.img} src={linkCopy} alt="check icon" />
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : null}

      <div className={style.lobbyMain__control}>
        {userRole === UserRoles.USER_ADMIN ? (
          <>
            <ButtonSubmit
              onclickHandler={() => {
                startGame();
                socket.emit(EVENTS.CLIENT.ADD_TITLE_LOBBY, {
                  isTitleLobby,
                  roomId,
                });
              }}
              text="Start Game"
            />
            <ButtonCancel
              cancelPlay={() => cancelPlay()}
              onclickHandler={() => {
                dispatch(setCancelGame(true));
                socket.emit('GAME_IS_OVER', { isCancelGame: true, roomId });
                setTimeout(() => cancelGameHandler(), 2000);
              }}
              text="Cancel game"
            />
          </>
        ) : (
          <ButtonCancel
            cancelPlay={() => cancelPlay()}
            onclickHandler={() => {
              exitGame();
            }}
            text="Exit"
          />
        )}
      </div>
      {startGameFlag ? (
        <PopUp active={startGameFlag} setActive={setStartGameFlag}>
          <ErrorWindow text="You need to add an item to issues or add the name of the room." />
        </PopUp>
      ) : (
        ''
      )}
      {cancelGameStore ? (
        <PopUp active={cancelGameStore} setActive={endGame}>
          <ErrorWindow text="The game canceled." />
        </PopUp>
      ) : (
        ''
      )}
    </section>
  );
};

export default LobbyMain;
