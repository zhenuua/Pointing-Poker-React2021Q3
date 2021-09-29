import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import authorTest from '../../assets/images/ImageUser.png';

import style from './Game-page.module.scss';

import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';
import Card from '../../components/card/Card';
import ScoreTab from '../../components/score-tab/ScoreTab';
import PersonalDataTabMini from '../../components/personal-data-tab-mini/PersonalDataTabMini';
import LobbyTitle from '../../components/lobby-title/LobbyTitle';
import ButtonWhite from '../../components/button-white/ButtonWhite';
import IssueTab from '../../components/issue-tab/IssueTab';
import NewIssue from '../../components/new-issue-tab/NewIssue';
import ButtonMini from '../../components/button-blue-mini/ButtonMini';
import TimerComponent from '../../components/timer/TimerComponent';
import CardCoffee from '../../components/card-coffee/CardCoffee';

import petter from '../../assets/images/user/Petter.jpg';
import sendler from '../../assets/images/user/Sendler.jpg';
import travolta from '../../assets/images/user/Travolta.jpg';
import brad from '../../assets/images/user/Brad.jpg';

import { useTypedSelector } from '../../hooks/useTypedSelector';
import { UserRoles } from '../../store/types/sliceTypes';
import { IGameIssue, setCurIssue, setGameIssues } from '../../store/reducers/gameSlice';
import { IUserInfo } from '../../store/reducers/lobbySlice';

type dataType = {
  id: number,
  name: string,
  staff: string,
  current: boolean,
  photo: any,
};

const GamePage: React.FC = (): JSX.Element => {
  const { users, gameSettings, issues } = useTypedSelector((state) => state.lobbySlice);
  const { socketId, userRole } = useTypedSelector((state) => state.userSlice);
  const { curIssue, gameIssues, roundOn } = useTypedSelector((state) => state.gameSlice);
  const dispatch = useDispatch();

  const { cardValues, shortScoreType } = gameSettings;
  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);
  const [players, setPlayers] = useState<IUserInfo[]>();

  // useEffect(() => {
  //   let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
  //   if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
  //   const arr = issues.map((issue) => {
  //     const item = {
  //       issueId: issue.issueTitle,
  //       scores: playersArr.map((user) => ({ socketId: user.socketId, score: null })),
  //     };
  //     return item;
  //   });
  //   dispatch(setGameIssues(arr));
  // }, []);

  useEffect(() => {
    if (!gameIssues.length) {
      let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
      if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
      const arr = issues.map((issue) => {
        const item = {
          issueId: issue.issueTitle,
          scores: playersArr.map((user) => ({ socketId: user.socketId, score: null })),
        };
        return item;
      });
      dispatch(setGameIssues(arr));
    }
  }, [issues]);

  useEffect(() => {
    let playersArr = users.filter((user) => user.userRole === UserRoles.USER_PLAYER);
    if (gameSettings.scramMaster && admin) playersArr = [admin, ...playersArr];
    setPlayers(playersArr);
  }, [users]);

  useEffect(() => {
    if (!curIssue && gameIssues.length) dispatch(setCurIssue(gameIssues[0]));
  }, [gameIssues]);

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
              userStaff={admin?.lastName || 'no data'}
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
                  isCurrent={!!(curIssue && curIssue.issueId === issue.issueTitle)}
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
        <div className={style.cardWrapper}>
          <CardCoffee />
          {cardValues.map((item) => {
            return <Card key={item} cardPoints={item} shortScoreType={shortScoreType} />;
          })}
        </div>
      </div>
      <div className={style.gameWrapperRight}>
        <div className={style.scoreColumn}>
          <span className={style.headerText}>Score:</span>
          {curIssue &&
            curIssue.scores.map((score) =>
              roundOn ? (
                <ScoreTab
                  status={score === null ? 'In Progress' : 'Ready'}
                  key={`${score.socketId}`}
                />
              ) : (
                <ScoreTab
                  status={
                    score.score === null ? 'waiting to vote' : `${score.score} points`
                  }
                  key={`${score.socketId}`}
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
