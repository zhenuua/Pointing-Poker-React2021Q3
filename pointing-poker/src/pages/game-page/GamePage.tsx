import React from 'react';

import PersonalDataTab from '../../components/personal-data-tab/PersonalDataTab';

import userImage from '../../assets/images/Avatar(Auto).png';
import authorTest from '../../assets/images/ImageUser.png';
import dambldorImage from '../../assets/images/dambldor.jpg';

import style from './Game-page.module.scss';

import Card from '../../components/card/Card';
import ScoreTab from '../../components/score-tab/ScoreTab';
import PersonalDataTabMini from '../../components/personal-data-tab-mini/PersonalDataTabMini';
import LobbyTitle from '../../components/lobby-title/LobbyTitle';
import ButtonWhite from '../../components/button-white/ButtonWhite';
import IssueTab from '../../components/issue-tab/IssueTab';
import NewIssue from '../../components/new-issue-tab/NewIssue';
import ButtonMini from '../../components/button-blue-mini/ButtonMini';
import TimerComponent from '../../components/timer/TimerComponent';

const GamePage: React.FC = (): JSX.Element => {
  return (
    <div className={style.gamePageWrapper}>
      <div className={style.gameWrapperLeft}>
        <LobbyTitle isScrumMaster />
        <div className={style.scrumBlock}>
          <div className={style.scrumMasterWrapper}>
            <span className={style.scrumMasterText}>Scrum Master:</span>
            <PersonalDataTab
              userImage={authorTest}
              userName="Tim Cook"
              userStaff="senior software"
              isCurrentUser
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
            <IssueTab status="Issue 13" isCurrent priority="Low Priority" />
            <IssueTab status="Issue 542" isCurrent={false} priority="Low Priority" />
            <IssueTab status="Issue 6421" isCurrent={false} priority="High Priority" />
            <IssueTab status="Issue 13" isCurrent={false} priority="Low Priority" />
            <NewIssue />
          </div>
          <div className={style.runRoundWrapper}>
            <TimerComponent />
            <ButtonMini text="Run Round" />
          </div>
        </div>
      </div>
      <div className={style.gameWrapperRight}>
        <div className={style.scoreColumn}>
          <span className={style.headerText}>Score:</span>
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
          <ScoreTab status="In Progress" />
        </div>
        <div className={style.playersColumn}>
          <span className={style.headerText}>Players:</span>
          <div>
            <PersonalDataTabMini
              userImage={authorTest}
              userName="Tim Cook"
              userStaff="senior software"
              isCurrentUser
              isRemove
            />
            <PersonalDataTabMini
              userImage={authorTest}
              userName="Max Kalevich"
              userStaff="senior software"
              isCurrentUser
              isRemove
            />
            <PersonalDataTabMini
              userImage={authorTest}
              userName="Joshabe Gibs"
              userStaff="senior software"
              isCurrentUser
              isRemove
            />
            <PersonalDataTabMini
              userImage={authorTest}
              userName="Vin Diesel"
              userStaff="senior software"
              isCurrentUser
              isRemove
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
