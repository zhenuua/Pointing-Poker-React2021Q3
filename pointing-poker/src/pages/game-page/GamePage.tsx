import React from 'react';

import style from './Game-page.module.scss';

const GamePage: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1 className={style.gamePageHeader}>Game Page</h1>
    </div>
  );
};

export default GamePage;
