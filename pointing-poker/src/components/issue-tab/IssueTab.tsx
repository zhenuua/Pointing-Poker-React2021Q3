/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactEventHandler } from 'react';

import close from '../../assets/images/Close-icon.svg';

import { IssueTabType } from '../../types/types';

import style from './Issue-tab.module.scss';

const IssueTab: React.FC<IssueTabType> = ({
  status,
  isCurrent,
  priority,
  handleIssueClick,
}): JSX.Element => {
  const handleClick = () => {
    handleIssueClick && handleIssueClick(status);
  };
  return (
    <div className={style.tabWrapper} onClick={handleClick}>
      {isCurrent ? <span className={style.current}>Current</span> : ''}
      <span className={style.priority}>{priority}</span>
      <span className={style.tabText}>{status}</span>
      <img className={style.closeIcon} src={close} alt="remove icon" />
    </div>
  );
};

export default IssueTab;
