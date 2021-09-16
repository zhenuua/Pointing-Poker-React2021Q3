import React from 'react';

import { ScoreTabType } from '../../types/types';

import style from './Score-tab.module.scss';

const ScoreTab: React.FC<ScoreTabType> = ({ status }): JSX.Element => {
  return (
    <div className={style.tabWrapper}>
      <span className={style.tabText}>{status}</span>
    </div>
  );
};

export default ScoreTab;
