import React from 'react';
import { NavLink } from 'react-router-dom';

import './Nav.scss';

export const Nav: React.FC = () => {
  return (
    <div className="nav-container">
      <nav className="header-nav">
        <NavLink exact to="/">
          Main-page
        </NavLink>
        <NavLink exact to="/lobby-page">
          lobby-page
        </NavLink>
        <NavLink exact to="/game-page">
          game-page
        </NavLink>
        <NavLink exact to="/404">
          404
        </NavLink>
      </nav>
    </div>
  );
};
