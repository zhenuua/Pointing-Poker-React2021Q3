import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
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
import CardCoffee from '../../components/card-coffee/CardCoffee';

import petter from '../../assets/images/user/Petter.jpg';
import sendler from '../../assets/images/user/Sendler.jpg';
import travolta from '../../assets/images/user/Travolta.jpg';
import brad from '../../assets/images/user/Brad.jpg';
import { useTypedSelector } from '../../hooks/useTypedSelector';
// import frodo from '../../assets/images/user/Frodo.jpg';

type dataType = {
  id: number,
  name: string,
  staff: string,
  current: boolean,
  photo: any,
};

const GamePage: React.FC = (): JSX.Element => {
  const [data, setData] = useState<dataType[]>([
    { id: 1, name: 'Max Kalevich', staff: 'Senior', current: true, photo: travolta },
    { id: 2, name: 'Brad Pitt', staff: 'Cleaner', current: false, photo: brad },
    { id: 3, name: 'John Travolta', staff: 'Actor', current: false, photo: travolta },
    { id: 4, name: 'Adam Sendler', staff: 'Physics', current: false, photo: sendler },
    { id: 5, name: 'Petter Peddigry', staff: 'Wizzard', current: false, photo: petter },
  ]);
  const dispatch = useDispatch();
  const { gameSettings } = useTypedSelector((state) => state.lobbySlice);
  const { cardValues } = gameSettings;
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
            return <Card key={item} cardPoints={item} />;
          })}
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
            {data.map((user) => (
              <div>
                <PersonalDataTabMini
                  userImage={user.photo}
                  userName={user.name}
                  userStaff={user.staff}
                  isCurrentUser={user.current}
                  isRemove
                  id={user.id}
                  setData={setData}
                  data={data}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
