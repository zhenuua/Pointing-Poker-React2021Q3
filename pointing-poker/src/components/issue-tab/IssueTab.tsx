import React from 'react';

import close from '../../assets/images/Close-icon.svg';

import style from './Issue-tab.module.scss';

type ScoreTabType = {
  status: string,
  isCurrent: boolean,
  priority: string,
};

const IssueTab: React.FC<ScoreTabType> = ({
  status,
  isCurrent,
  priority,
}): JSX.Element => {
  return (
    <div className={style.tabWrapper}>
      {isCurrent ? <span className={style.current}>Current</span> : ''}

      <span className={style.priority}>{priority}</span>
      <span className={style.tabText}>{status}</span>
      <img className={style.closeIcon} src={close} alt="remove icon" />
    </div>
  );
};

export default IssueTab;
