/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import Card from '../../components/card/Card';
import ScoreTab from '../../components/score-tab/ScoreTab';
import PersonalDataTabMini from '../../components/personal-data-tab-mini/PersonalDataTabMini';
import LobbyTitle from '../../components/lobby-title/LobbyTitle';
import ButtonWhite from '../../components/button-white/ButtonWhite';
import IssueTab from '../../components/issue-tab/IssueTab';
import ButtonMini from '../../components/button-blue-mini/ButtonMini';
import TimerComponent from '../../components/timer/TimerComponent';
import CardCoffee from '../../components/card-coffee/CardCoffee';

import avatar from '../../assets/images/ImageUser.png';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { setChatIconVisible } from '../../store/reducers/controlSlice';
import {
  clearPendingUsers,
  fetchGameSettings,
  fetchIssues,
  IScore,
  IUserInfo,
  setCurCardValueInScorePlayer,
  removePendingUser,
  setCurIssue,
  setRestartRnd,
  postGamePlayers,
} from '../../store/reducers/lobbySlice';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';

import { PendingUsersPopup } from './pendingUsersPopup';
import style from './Game-page.module.scss';
import {
  setGameOn,
  setGameOver,
  setRoundOn,
  updateGameStatus,
} from '../../store/reducers/gameSlice';
import PendingUserDataTab from '../../components/pending-user-tab/Pending-user-tab';
import plus from '../../assets/icons/plus.svg';
import PopUp from '../../components/popup/PopUp';
import FormCreateIssue from '../../components/form-create-issue/FormCreateIssue';
import CardStatistics from '../../components/card-statistics/CardStatistics';
import Statistics from '../../components/statistics/Statistics/Statistics';

const GamePage: React.FC = (): JSX.Element => {
  const [restartRound, setRestartRound] = useState<boolean>(false);
  const [curScoreIndex, setCurScoreIndex] = useState<number>();
  const [popupCreateIssue, setPopupCreateIssue] = useState<boolean>(false);
  const history = useHistory();
  const result: any = {};
  const { users, gameSettings, issues, players } = useTypedSelector(
    (state) => state.lobbySlice,
  );
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { roundOn, gameOn } = useTypedSelector((state) => state.gameSlice);
  const { curIssue, resultsVoted, pendingUsers } = useTypedSelector(
    (state) => state.lobbySlice,
  );
  const dispatch = useDispatch();
  const { socket } = useSocketsContext();

  const { cardValues, shortScoreType, autoConnect, cardChange } = gameSettings;
  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);

  const roundStart = () => {
    dispatch(setRoundOn(true));
    socket.emit(EVENTS.CLIENT.START_ROUND, { roomId, roundOn: true });
  };

  const roundRestart = () => {
    dispatch(setRestartRnd({ curScoreIndex, curIssue }));
    socket.emit(EVENTS.CLIENT.RESTART_ROUND, {
      roomId,
      curScoreIndex,
      curIssue,
    });
  };

  const nextIssue = () => {
    let nextIssueValue: any = null;
    let lastIssueValue: any = null;
    issues.length > 1 &&
      issues.forEach((e, i, arr) => {
        if (e.issueTitle === curIssue?.issueTitle) {
          nextIssueValue = arr[i + 1];
          if (
            nextIssueValue !== undefined &&
            nextIssueValue.issueTitle === arr[arr.length - 1].issueTitle
          ) {
            lastIssueValue = arr[arr.length - 1];
          }
          if (i + 1 === arr.length) {
            const len = arr.length - 1;
            nextIssueValue = arr[len % i];
          }
        }
      });

    if (nextIssueValue !== null) dispatch(setCurIssue(nextIssueValue.issueTitle));
    socket.emit('NEXT_ISSUE', { roomId, nextIssueValue });
  };

  // const setValueIssue = (card: number | string) => {
  //   if (!roundOn) return;
  //   dispatch(setCurCardValueInScorePlayer({ card, socketId, curScoreIndex, curIssue }));
  //   socket.emit(EVENTS.CLIENT.SCORE_VALUE_CURRENT_USER, {
  //     card,
  //     socketId,
  //     curScoreIndex,

  const setValueIssue = (card: number) => {
    if (!restartRound && !roundOn) return;
    if (roundOn || cardChange) {
      dispatch(setCurCardValueInScorePlayer({ card, socketId, curScoreIndex, curIssue }));
      socket.emit(EVENTS.CLIENT.SCORE_VALUE_CURRENT_USER, {
        card,
        socketId,
        curScoreIndex,
        roomId,
      });
    }
  };

  useEffect(() => {
    const index =
      players.length && curScoreIndex !== undefined
        ? players.findIndex((player) => player.scores[curScoreIndex].score !== null)
        : null;
    index !== -1 && index !== null ? setRestartRound(true) : setRestartRound(false);
    // console.log(`${index} index`);
    // console.log(`${curScoreIndex} curScoreIndex`);

    const allVoted =
      players.length && curScoreIndex !== undefined
        ? players.filter((player) => player.scores[curScoreIndex].score === null)
        : '';
    if (allVoted.length === 0) {
      if (resultsVoted) {
        //   console.log('View all Cards');
        dispatch(setRoundOn(false));
        // setOpenCards(true);
        socket.emit(EVENTS.CLIENT.END_ROUND, { roundOn, roomId });
      }
    }
  }, [curScoreIndex, players]);
  // const dispatchChaining = async () => {
  //   await Promise.all([
  //     dispatch(fetchGameSettings({ roomId })),
  //     dispatch(fetchIssues({ roomId })),
  //   ]);
  // };

  // useEffect(() => {
  //   dispatchChaining();
  // }, []);

  useEffect(() => {
    dispatch(setChatIconVisible(true));
    const index =
      players.length && issues.length && curIssue
        ? players[0].scores.findIndex((score) => score.issueTitle === curIssue.issueTitle)
        : null;
    if (index !== -1 && index !== null) setCurScoreIndex(index);
  }, [curIssue, issues]);

  const handleIssueClick = async (issueTitle: string) => {
    if (roundOn) {
      alert('switching curIssue is not allowed during active round');
      return;
    }
    const newCurIssue = issues.find((issue) => issue.issueTitle === issueTitle);
    if (newCurIssue) {
      dispatch(setCurIssue(newCurIssue.issueTitle));
      socket.emit(EVENTS.CLIENT.NEW_CURISSUE, {
        issueTitle: newCurIssue.issueTitle,
        roomId,
      });
    } else {
      alert('no match for curIssue found in issues ');
    }
  };

  // <----------------reject/admit pending user----START------>
  const handleDeletePendingUser = (id: string, role: UserRoles) => {
    dispatch(removePendingUser({ socketId: id }));
    socket.emit(EVENTS.CLIENT.ACCESS_PENDING_USER, {
      socketId: id,
      roomId,
      access: false,
      players: null,
      curIssue: null,
    });
  };

  const handleAddPendingUser = (id: string) => {
    dispatch(removePendingUser({ socketId: id }));
    socket.emit(EVENTS.CLIENT.ACCESS_PENDING_USER, {
      socketId: id,
      roomId,
      access: true,
      players,
      curIssue,
    });
  };

  useEffect(() => {
    if (
      userRole === UserRoles.USER_ADMIN &&
      autoConnect &&
      !roundOn &&
      pendingUsers.length
    ) {
      pendingUsers.forEach((user) => {
        socket.emit(EVENTS.CLIENT.ACCESS_PENDING_USER, {
          socketId: user.socketId,
          roomId,
          access: true,
          players,
          curIssue,
        });
      });
      dispatch(clearPendingUsers());
    }
  }, [pendingUsers, roundOn]);
  // <-----reject/admit pending user----END------>>

  const exitGame = () => {
    console.log('exiting lobby/game');
    socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled: true, userRole });
    history.push('/');
    console.log('going back in history');
  };

  const stopGame = async () => {
    let needVote = false;
    players.forEach((player) => {
      player.scores.forEach((score) => {
        if (score.score === null) needVote = true;
      });
    });
    if (needVote) {
      alert('every player must vote for every issue');
      return;
    }
    console.log('stop game');
    await Promise.all([
      dispatch(postGamePlayers({ roomId, players })),
      dispatch(updateGameStatus({ roomId, gameOn: false, gameOver: true })),
    ]);
    dispatch(setGameOver(true));
    dispatch(setGameOn(false));
    socket.emit(EVENTS.CLIENT.GAME_ENDED, { roomId });
    socket.emit(EVENTS.CLIENT.USER_LEAVE, { roomId, gameCanceled: false });
    history.push(`/game-result/${roomId}`);
  };

  return (
    <div className={style.gamePageWrapper}>
      <div className={style.gameWrapperLeft}>
        <LobbyTitle isScrumMaster={userRole === 'ADMIN'} />
        <div className={style.scrumBlock}>
          <div className={style.scrumMasterWrapper}>
            <span className={style.scrumMasterText}>Scrum Master:</span>
            <PersonalDataTab
              userImage={admin?.avatarImg ? admin?.avatarImg : avatar}
              userName={admin?.username || 'no data'}
              userStaff={admin?.jobPosition || 'no data'}
              isCurrentUser={admin?.socketId === socketId}
              isRemove={false}
            />
          </div>
          {userRole === UserRoles.USER_ADMIN && (
            <ButtonWhite text="Stop Game" onClick={stopGame} />
          )}
          {userRole !== UserRoles.USER_ADMIN && (
            <ButtonWhite text="Exit Game" onClick={exitGame} />
          )}
        </div>
        <div className={style.issuesWrapper}>
          <div className={style.issuesText}>Issues:</div>
        </div>
        <div className={style.wrapper}>
          <div className={style.issueTabWrapper}>
            {issues.length &&
              issues.map((issue) => (
                <IssueTab
                  status={issue.issueTitle}
                  isCurrent={!!(curIssue && curIssue.issueTitle === issue.issueTitle)}
                  priority={issue.priority}
                  key={issue.issueTitle}
                  handleIssueClick={
                    userRole === UserRoles.USER_ADMIN ? handleIssueClick : undefined
                  }
                />
              ))}
            {userRole === UserRoles.USER_ADMIN && (
              <div
                className={style.issueTabWrapper__item}
                aria-hidden="true"
                onClick={() => {
                  setPopupCreateIssue(true);
                }}
              >
                <p className={style.issueTabWrapper__item__title}>Create new Issue</p>
                <img
                  className={style.issueTabWrapper__item__img}
                  src={plus}
                  alt="Create new Issue"
                />
              </div>
            )}
          </div>
          <div className={style.runRoundWrapper}>
            <TimerComponent isEditMode={false} isStartTimer={roundOn} />
            {userRole === UserRoles.USER_ADMIN && !roundOn && (
              <div className={style.btnRestart}>
                <ButtonMini
                  text={restartRound ? 'Restart' : 'Run Round'}
                  onClick={() => (!restartRound ? roundStart() : roundRestart())}
                />
              </div>
            )}
            {userRole === UserRoles.USER_ADMIN && !roundOn && restartRound && (
              <div className={style.btnNextIssue}>
                <ButtonMini text="Next Issue" onClick={() => nextIssue()} />
              </div>
            )}
          </div>
        </div>
        {(userRole === UserRoles.USER_PLAYER ||
          (userRole === UserRoles.USER_ADMIN && gameSettings.scramMaster)) && (
          <div className={style.cardWrapper}>
            <h2 className={style.headerCards}>Select a card to evaluate the issue:</h2>
            <CardCoffee
              cardPoints="unknown"
              gameOn
              setValueIssue={setValueIssue}
              restartRound={restartRound}
            />
            {cardValues.map((item) => {
              return (
                <Card
                  key={item}
                  cardPoints={item}
                  shortScoreType={shortScoreType}
                  gameOn
                  setValueIssue={setValueIssue}
                  restartRound={restartRound}
                />
              );
            })}
          </div>
        )}
        {gameOn && !roundOn ? (
          <>
            {restartRound
              ? curScoreIndex !== undefined && (
                  <Statistics curScoreIndex={curScoreIndex} />
                )
              : ''}
          </>
        ) : (
          ''
        )}
      </div>
      <div className={style.gameWrapperRight}>
        <div className={style.scoreColumn}>
          <span className={style.headerText}>Score:</span>
          {players.length &&
            curScoreIndex !== undefined &&
            players.map((player) =>
              roundOn ? (
                <ScoreTab
                  status={
                    player.scores[curScoreIndex].score === null ? 'In Progress' : 'Ready'
                  }
                  key={`${player.socketId}`}
                />
              ) : (
                <ScoreTab
                  status={
                    player.scores[curScoreIndex].score === null
                      ? 'waiting to vote'
                      : player.scores[curScoreIndex].score
                      ? `${player.scores[curScoreIndex].score} points`
                      : 'unknown'
                  }
                  key={`${player.socketId}`}
                />
              ),
            )}
        </div>
        <div className={style.playersColumn}>
          <span className={style.headerText}>Players:</span>
          <div>
            {players &&
              players.map((user) => (
                <PersonalDataTabMini
                  userImage={user.avatarImg ? user.avatarImg : avatar}
                  userName={user.username}
                  userStaff={user.jobPosition}
                  isCurrentUser={user.socketId === socketId}
                  isRemove={
                    userRole === UserRoles.USER_ADMIN && user.socketId !== socketId
                  }
                  // id={user.socketId}
                  // setData={setData}
                  // data={data}
                  key={user.socketId}
                />
              ))}
          </div>
          <span className={style.headerText}>Pending users:</span>
          {userRole === UserRoles.USER_ADMIN && !roundOn && pendingUsers.length ? (
            pendingUsers.map((user) => {
              return (
                <PendingUserDataTab
                  userImage={user.avatarImg ? user.avatarImg : avatar}
                  userName={user.username}
                  lastName={user.lastName}
                  userStaff={user.jobPosition}
                  isRemove
                  key={`${user.socketId}`}
                  socketId={user.socketId}
                  userRole={user.userRole}
                  deleteUser={handleDeletePendingUser}
                  addUser={handleAddPendingUser}
                  isCurrentUser={false}
                />
              );
            })
          ) : roundOn && pendingUsers.length ? (
            <div>Pending users are unavailable during active round</div>
          ) : null}
        </div>
      </div>
      {/* {userRole === UserRoles.USER_ADMIN && !roundOn && pendingUsers.length ? (
        <PendingUsersPopup />
      ) : null} */}
      {userRole === UserRoles.USER_ADMIN && (
        <PopUp active={popupCreateIssue} setActive={setPopupCreateIssue}>
          <FormCreateIssue
            onSubmitHandler={() => {
              setPopupCreateIssue(false);
            }}
            onCancelHandler={() => {
              setPopupCreateIssue(false);
            }}
          />
        </PopUp>
      )}
    </div>
  );
};

export default GamePage;
