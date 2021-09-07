import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import LobbyPage from '../../pages/lobby-page/LobbyPage';
import GamePage from '../../pages/game-page/GamePage';

import './MainContent.scss';

const MainContent: React.FC = (): JSX.Element => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition timeout={500} classNames="router__fade" key={location.key}>
        <Switch location={location}>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/lobby-page">
            <LobbyPage />
          </Route>
          <Route path="/game-page">
            <GamePage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default MainContent;
