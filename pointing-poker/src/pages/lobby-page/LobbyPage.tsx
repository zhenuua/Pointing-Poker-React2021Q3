import React from 'react';

import style from './Lobby-page.module.scss';

const LobbyPage: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1 className={style.lobbyPageHeader}>Lobby Page</h1>
    </div>
  );
};

export default LobbyPage;
