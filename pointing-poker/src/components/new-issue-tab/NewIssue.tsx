import React from 'react';

import addIssueIcon from '../../assets/images/Close-icon.svg';

import style from './New-issue.module.scss';

const NewIssue: React.FC = (): JSX.Element => {
  return (
    <div className={style.tabWrapper}>
      <span className={style.tabText}>Create New Issue</span>
      <img className={style.closeIcon} src={addIssueIcon} alt="remove icon" />
    </div>
  );
};

export default NewIssue;
