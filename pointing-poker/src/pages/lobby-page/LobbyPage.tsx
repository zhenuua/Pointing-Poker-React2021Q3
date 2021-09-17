import React, { MouseEvent, ChangeEvent, useEffect, useState } from 'react';

import style from './Lobby-page.module.scss';

import LobbyMain from './lobbyMain';
import LobbyMembers from './lobbyMembers';
import LobbySettings from './lobbySettings';
import LobbyIssues from './lobbyIssues';
import LobbyCards from './lobbyCards';

const LobbyPage: React.FC = (): JSX.Element => {
  return (
    <div className={style.wrapperLobby}>
      <LobbyMain />
      <LobbyMembers />
      <LobbyIssues />
      <LobbySettings />
      <LobbyCards />
    </div>
  );
};

export default LobbyPage;
