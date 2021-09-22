import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import PopUp from '../../components/popup/PopUp';

import plus from '../../assets/icons/plus.svg';
import style from './Lobby-page.module.scss';
import FormCreateIssue from '../../components/form-create-issue/FormCreateIssue';
import IssueLobby from '../../components/issue-lobby/IssueLobby';
import issues from './issues';

const LobbyIssues: React.FC = (): JSX.Element => {
  const [popupCreateIssue, setPopupCreateIssue] = useState<boolean>(false);

  return (
    <section className={style.lobbyIssues}>
      <h2 className={`${style.lobbyText} ${style.lobbyTextTitle}`}>Issues:</h2>
      <div className={style.lobbyIssues__items}>
        {issues.map((item) => {
          return (
            <IssueLobby key={item.title} titleIssue={item.title} prority={item.prority} />
          );
        })}
        <div
          className={style.lobbyIssues__item}
          aria-hidden="true"
          onClick={() => {
            setPopupCreateIssue(true);
          }}
        >
          <p className={style.lobbyIssues__item__title}>Create new Issue</p>
          <img
            className={style.lobbyIssues__item__img}
            src={plus}
            alt="Create new Issue"
          />
        </div>
      </div>
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
    </section>
  );
};

export default LobbyIssues;
