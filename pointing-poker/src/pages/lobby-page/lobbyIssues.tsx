import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';
import PopUp from '../../components/popup/PopUp';

import pencil from '../../assets/icons/pencil.svg';
import plus from '../../assets/icons/plus.svg';
import urn from '../../assets/icons/urn.svg';
import style from './Lobby-page.module.scss';
import Form from '../../components/form/Form';

const issues = [
  {
    title: 'Issue 542',
    prority: 'Low',
  },
  {
    title: 'Issue 911',
    prority: 'Middle',
  },
  {
    title: 'Issue 418',
    prority: 'Hight',
  },
];

const LobbyIssues: React.FC = (): JSX.Element => {
  const [popupCreateIssue, setPopupCreateIssue] = useState<boolean>(false);

  const deleteIssue = (e: MouseEvent<HTMLImageElement>) => {
    console.log(e.target);
  };
  const createIssue = () => {
    setPopupCreateIssue(true);
  };
  return (
    <section className={style.lobbyIssues}>
      <h2 className={`${style.lobbyText} ${style.lobbyTextTitle}`}>Issues:</h2>
      <div className={style.lobbyIssues__items}>
        {issues.map((item) => {
          return (
            <div className={style.lobbyIssues__item}>
              <p className={style.lobbyIssues__item__title}>
                {item.title}
                <span className={style.lobbyIssues__item__propity}>
                  {item.prority} prority
                </span>
              </p>
              <div>
                <img
                  className={style.lobbyIssues__item__img}
                  src={pencil}
                  alt="edit issue"
                />
                <img
                  onClick={(e: MouseEvent<HTMLImageElement>) => deleteIssue(e)}
                  id={item.title}
                  className={style.lobbyIssues__item__img}
                  src={urn}
                  alt="delite issue"
                  aria-hidden="true"
                />
              </div>
            </div>
          );
        })}
        <div className={style.lobbyIssues__item} aria-hidden="true" onClick={createIssue}>
          <p className={style.lobbyIssues__item__title}>Create new Issue</p>
          <img
            className={style.lobbyIssues__item__img}
            src={plus}
            alt="Create new Issue"
          />
        </div>
      </div>
      <PopUp active={popupCreateIssue} setActive={setPopupCreateIssue}>
        <Form setActive={setPopupCreateIssue} />
      </PopUp>
    </section>
  );
};

export default LobbyIssues;
