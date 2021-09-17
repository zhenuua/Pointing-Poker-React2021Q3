import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { io } from 'socket.io-client';
import { SearchPage } from './pages/search-page/SearchPage';
import { AboutPage } from './pages/about-page/aboutPage';
import { Nav } from './components/header-nav/Nav';
import { NoMatchPage } from './pages/no-match-page/NoMatchPage';
import { DetailsPage } from './pages/details-page/DetailsPage';
import './app.scss';
import { MainPage } from './pages/main-page/MainPage';
import { LobbyPage } from './pages/lobby-page/LobbyPage';
import useSockets from './hooks/useSockets';

// interface IContentProps {
//   blogsArr: NewsBlogProps[];
//   setBlogsArr: React.Dispatch<React.SetStateAction<NewsBlogProps[]>>;
// }

const Content: FC = () => {
  const location = useLocation();
  // const [currentSearch, setCurrentSearch] = useState('');
  const [lobbyId, setLobbyId] = useState('');
  const [userName, setUserName] = useState('');

  // if (lobbyId) setLobbyId('');

  return (
    <TransitionGroup>
      <CSSTransition timeout={300} classNames="fade" key={location.key}>
        <Switch location={location}>
          <Route exact path="/:lobbyParam?">
            {/* <SearchPage currentSearch={currentSearch} setCurrentSearch={setCurrentSearch} /> */}
            <MainPage />
          </Route>
          {/* <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/details/:title">
            <DetailsPage />
          </Route> */}
          <Route path="/lobby-page/:lobbyId">
            <LobbyPage />
          </Route>
          <Route path="*">
            <NoMatchPage />
          </Route>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export const App: FC = () => {
  // const [blogsArr, setBlogsArr] = useState<NewsBlogProps[]>([]);
  // const [socket, setSocket] = useState(null);
  useSockets();

  useEffect(() => {
    console.log('kek - rerender');
  }, []);
  return (
    <Router>
      <header>
        <Nav />
      </header>
      <main>
        <Content />
      </main>
    </Router>
  );
};
