import React from 'react';
import { Switch, Route } from 'react-router-dom';

import style from './App.module.scss';

import MainPage from './pages/main-page/MainPage';
import NotFoundPage from './pages/not-found-page/NotFoundPage';
import LobbyPage from './pages/lobby-page/LobbyPage';
import GamePage from './pages/game-page/GamePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App: React.FC = (): JSX.Element => (
  <div className={style.app}>
    <Header />
    <Switch>
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
    <Footer />
  </div>
);

export default App;
