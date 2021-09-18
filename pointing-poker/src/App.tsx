/* eslint-disable max-len */
import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import MainPage from './pages/main-page/MainPage';
import LobbyPage from './pages/lobby-page/LobbyPage';
import GamePage from './pages/game-page/GamePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFoundPage from './pages/not-found-page/NotFoundPage';

import cssTransition from './cssTransition.module.scss';
import { useSocketsContext } from './context/socket.context';

const App: React.FC = (): JSX.Element => {
  const location = useLocation();

  return (
    <>
      <Header />
      <TransitionGroup>
        <CSSTransition timeout={250} key={location.key} classNames={{ ...cssTransition }}>
          <Switch location={location}>
            <Route exact path="/:lobbyParam?">
              <MainPage />
            </Route>
            <Route exact path="/lobby-page/:lobbyId">
              <LobbyPage />
            </Route>
            <Route exact path="/game-page/:gameId">
              <GamePage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      <Footer />
    </>
  );
};

export default App;
