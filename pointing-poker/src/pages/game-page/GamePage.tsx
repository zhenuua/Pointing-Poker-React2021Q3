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

import style from './Game-page.module.scss';

const GamePage: React.FC = (): JSX.Element => {
  const { users, gameSettings, issues, players } = useTypedSelector(
    (state) => state.lobbySlice,
  );
  const { socketId, userRole } = useTypedSelector((state) => state.userSlice);
  const [curScoreIndex, setCurScoreIndex] = useState<number>();
  const { roundOn } = useTypedSelector((state) => state.gameSlice);
  const { curIssue } = useTypedSelector((state) => state.lobbySlice);
  const dispatch = useDispatch();

  const { cardValues, shortScoreType } = gameSettings;
  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);

  // const dispatchChaining = async () => {
  //   await Promise.all([
  //     dispatch(fetchGameSettings({ roomId })),
  //     dispatch(fetchIssues({ roomId })),
  //   ]);
  // };

  // useEffect(() => {
  //   dispatchChaining();
  // }, []);

  // below is obsolite!!!!!!!!!
  // useEffect(() => {
  //   let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
  //   if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
  //   setPlayers(playersArr);
  // }, [users, gameSettings]);

  useEffect(() => {
    if (!players.length && players) {
      // let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
      // if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
      const arr = issues.map((issue) => {
        const item = {
          issueId: issue.issueTitle,
          scores: players.map((user) => ({ socketId: user.socketId, score: null })),
        };
        return item;
      });
      dispatch(setGameIssues(arr));
    }
  }, [issues, players]);

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

  useEffect(() => {
    // if (!curIssue && players.length) dispatch(setCurIssue(issues[0]));
    dispatch(setChatIconVisible(true));
    const index =
      players.length && issues.length && curIssue
        ? players[0].scores.findIndex((score) => score.issueTitle === curIssue.issueTitle)
        : null;
    console.log(`${curScoreIndex} curScoreIndex`);
    console.log(`---------------index ------------${index}---------------`);
    if (index !== -1 && index !== null) setCurScoreIndex(index);
  }, [curIssue]);

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
            <ButtonMini text="Run Round" />
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
