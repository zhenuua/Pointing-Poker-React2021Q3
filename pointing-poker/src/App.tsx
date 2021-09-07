import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MainContent from './components/main-content/MainContent';

import Style from './App.module.scss';
import { Nav } from './components/header-nav/Nav';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main className={Style.main}>
        <MainContent />
      </main>
      <footer>some footer</footer>
    </>
  );
};

export default App;
