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

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { setGameIssues } from '../../store/reducers/gameSlice';
import { setChatIconVisible } from '../../store/reducers/controlSlice';
import {
  fetchGameSettings,
  fetchIssues,
  IScore,
  IUserInfo,
  setCurIssue,
} from '../../store/reducers/lobbySlice';
import { useSocketsContext } from '../../context/socket.context';
import { EVENTS } from '../../store/types/sockeIOEvents';

import style from './Game-page.module.scss';

const GamePage: React.FC = (): JSX.Element => {
  const { users, gameSettings, issues, players } = useTypedSelector(
    (state) => state.lobbySlice,
  );
  const { socketId, userRole, roomId } = useTypedSelector((state) => state.userSlice);
  const { roundOn } = useTypedSelector((state) => state.gameSlice);
  const { curIssue } = useTypedSelector((state) => state.lobbySlice);
  const dispatch = useDispatch();
  const { socket } = useSocketsContext();

  const [curScoreIndex, setCurScoreIndex] = useState<number>();
  const [restartRound, setRestartRound] = useState<boolean>(false);

  const { cardValues, shortScoreType } = gameSettings;
  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);

  useEffect(() => {
    const index =
      players.length && curScoreIndex !== undefined
        ? players.findIndex((player) => player.scores[curScoreIndex].score !== null)
        : null;
    index !== -1 && index !== null ? setRestartRound(true) : setRestartRound(false);
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
        <LobbyTitle isScrumMaster />
        <div className={style.scrumBlock}>
          <div className={style.scrumMasterWrapper}>
            <span className={style.scrumMasterText}>Scrum Master:</span>
            <PersonalDataTab
              userImage={admin?.avatarImg}
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
            {/* <IssueTab status="Issue 13" isCurrent priority="Low Priority" />
            <IssueTab status="Issue 542" isCurrent={false} priority="Low Priority" />
            <IssueTab status="Issue 6421" isCurrent={false} priority="High Priority" />
            <IssueTab status="Issue 13" isCurrent={false} priority="Low Priority" />
            <NewIssue /> */}
          </div>
          <div className={style.runRoundWrapper}>
            <TimerComponent isEditMode={false} isStartTimer={false} />
            {userRole === UserRoles.USER_ADMIN && !roundOn && (
              <ButtonMini text={restartRound ? 'Restart' : 'Run Round'} />
            )}
            {userRole === UserRoles.USER_ADMIN && !roundOn && restartRound && (
              <ButtonMini text="Next Issue" />
            )}
          </div>
        </div>
        <div className={style.statisticsWrapper}>
          <div className={style.issuesText}>Statistics:</div>
        </div>
        {(userRole === UserRoles.USER_PLAYER ||
          (userRole === UserRoles.USER_ADMIN && gameSettings.scramMaster)) && (
          <div className={style.cardWrapper}>
            <CardCoffee />
            {cardValues.map((item) => {
              return (
                <Card
                  key={item}
                  cardPoints={item}
                  shortScoreType={shortScoreType}
                  gameOn
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
          {/* <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" /> */}
        </div>
        <div className={style.playersColumn}>
          <span className={style.headerText}>Players:</span>
          <div>
            {players &&
              players.map((user) => (
                <PersonalDataTabMini
                  userImage={user.avatarImg}
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
