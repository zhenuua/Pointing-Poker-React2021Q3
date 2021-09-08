import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import { Nav } from './components/header-nav/Nav';
import MainPage from './pages/main-page/MainPage';
import LobbyPage from './pages/lobby-page/LobbyPage';
import GamePage from './pages/game-page/GamePage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';

import Style from './App.module.scss';
import cssTransition from './cssTransition.module.scss';

const App: React.FC = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <TransitionGroup>
        <CSSTransition timeout={250} key={location.key} classNames={{ ...cssTransition }}>
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
    </>
  );
};

export default App;
