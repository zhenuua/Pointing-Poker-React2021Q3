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
import { IGameIssue, setGameIssues } from '../../store/reducers/gameSlice';

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
  const { curIssue, gameIssues } = useTypedSelector((state) => state.gameSlice);
  const dispatch = useDispatch();

  const { cardValues, shortScoreType } = gameSettings;
  const admin = users.find((user) => user.userRole === UserRoles.USER_ADMIN);
  const [data, setData] = useState<dataType[]>([
    { id: 1, name: 'Max Kalevich', staff: 'Senior', current: true, photo: travolta },
    { id: 2, name: 'Brad Pitt', staff: 'Cleaner', current: false, photo: brad },
    { id: 3, name: 'John Travolta', staff: 'Actor', current: false, photo: travolta },
    { id: 4, name: 'Adam Sendler', staff: 'Physics', current: false, photo: sendler },
    { id: 5, name: 'Petter Peddigry', staff: 'Wizzard', current: false, photo: petter },
  ]);

  useEffect(() => {
    const arr = issues.map((issue) => {
      const item = {
        issueId: issue.issueTitle,
        scores: users.map((user) => {
          if (user.userRole === UserRoles.USER_ADMIN && !gameSettings.scramMaster) return;
          // eslint-disable-next-line consistent-return
          return {
            socketId: user.socketId,
            score: null,
          };
        }),
      };
      return item;
    });
    dispatch(setGameIssues(arr));
  }, []);

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
                  isCurrent={curIssue === issue.issueTitle}
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
          {gameIssues.length &&
            gameIssues.map((issue: IGameIssue) => {
              if (issue.issueId !== curIssue) return;
              // eslint-disable-next-line consistent-return
              return issue.scores.map((score) => (
                <ScoreTab status={score.score === null ? 'In Progress' : 'Done'} />
              ));
            })}
          {/* <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" /> */}
        </div>
        <div className={style.playersColumn}>
          <span className={style.headerText}>Players:</span>
          <div>
            {users.map((user) => {
              if (user.userRole === UserRoles.USER_ADMIN && !gameSettings.scramMaster)
                return;
              // eslint-disable-next-line consistent-return
              return (
                <div>
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
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
