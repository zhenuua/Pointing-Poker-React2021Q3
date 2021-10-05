import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

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
  fetchGameSettings,
  fetchIssues,
  IScore,
  IUserInfo,
  setCurCardValueInScorePlayer,
  setCurIssue,
  setRestartRnd,
} from '../../store/reducers/lobbySlice';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';

import style from './Game-page.module.scss';
import { setRoundOn } from '../../store/reducers/gameSlice';

const GamePage: React.FC = (): JSX.Element => {
  const [restartRound, setRestartRound] = useState<boolean>(false);
  const [openCards, setOpenCards] = useState<boolean>(false);
  const [curScoreIndex, setCurScoreIndex] = useState<number>();
  const { users, gameSettings, issues, players } = useTypedSelector(
    (state) => state.lobbySlice,
  );
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { roundOn } = useTypedSelector((state) => state.gameSlice);
  const { curIssue, resultsVoted } = useTypedSelector((state) => state.lobbySlice);

  const { socket } = useSocketsContext();
  const dispatch = useDispatch();

  const { cardValues, shortScoreType } = gameSettings;
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
    console.log('restart');
  };

  const nextIssue = () => {
    let nextIssueValue: any = null;
    let lastIssueValue: any = null;
    issues.forEach((e, i, arr) => {
      if (e.issueTitle === curIssue?.issueTitle) {
        console.log('Current value');
        nextIssueValue = arr[i + 1];
        console.log(nextIssueValue);
        if (
          nextIssueValue !== undefined &&
          nextIssueValue.issueTitle === arr[arr.length - 1].issueTitle
        ) {
          console.log('Одинаковые');
          lastIssueValue = arr[arr.length - 1];
          console.log(lastIssueValue);
          // const len = arr.length - 3;
          // nextIssueValue = arr[len % i];
          // console.log(len);
        }
        if (i + 1 === arr.length) {
          console.log('Перебор');
          const len = arr.length - 1;
          nextIssueValue = arr[len % i];
        }
      }
    });

    if (nextIssueValue !== null) dispatch(setCurIssue(nextIssueValue.issueTitle));
    socket.emit('NEXT_ISSUE', { roomId, nextIssueValue });
  };

  const setValueIssue = (card: number | string) => {
    if (!roundOn) return;
    dispatch(setCurCardValueInScorePlayer({ card, socketId, curScoreIndex, curIssue }));
    socket.emit(EVENTS.CLIENT.SCORE_VALUE_CURRENT_USER, {
      card,
      socketId,
      curScoreIndex,
      roomId,
    });
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
          <ButtonWhite text="Stop Game" />
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
        <div className={style.statisticsWrapper}>
          <div className={style.issuesText}>Statistics:</div>
        </div>
        {(userRole === UserRoles.USER_PLAYER ||
          (userRole === UserRoles.USER_ADMIN && gameSettings.scramMaster)) && (
          <div className={style.cardWrapper}>
            <CardCoffee cardPoints="unknown" gameOn setValueIssue={setValueIssue} />
            {cardValues.map((item) => {
              return (
                <Card
                  key={item}
                  cardPoints={item}
                  shortScoreType={shortScoreType}
                  gameOn
                  setValueIssue={setValueIssue}
                />
              );
            })}
          </div>
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
                      : `${player.scores[curScoreIndex].score} points`
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
        </div>
      </div>
    </div>
  );
};

export default GamePage;

// below is obsolite!!!!!!!!!
// useEffect(() => {
//   let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
//   if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
//   setPlayers(playersArr);
// }, [users, gameSettings]);

// useEffect(() => {
//   if (!players.length && players) {
//     // let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
//     // if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
//     const arr = issues.map((issue) => {
//       const item = {
//         issueId: issue.issueTitle,
//         scores: players.map((user) => ({ socketId: user.socketId, score: null })),
//       };
//       return item;
//     });
//     dispatch(setGameIssues(arr));
//   }
// }, [issues, players]);

// useEffect(() => {
//   players &&
//     players.map((user) => {
//       if (curIssue) {
//         const check =
//           curIssue.scores.find((score) => score.socketId === user.socketId);
//         if (!check) {

//         }
//       }
//     });
// }, [players]);
