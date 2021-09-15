import React from 'react';

import style from './Score-tab.module.scss';

type ScoreTabType = {
  status: string,
};

const ScoreTab: React.FC<ScoreTabType> = ({ status }): JSX.Element => {
  return (
    <div className={style.tabWrapper}>
      <span className={style.tabText}>{status}</span>
    </div>
  );
};

export default ScoreTab;
