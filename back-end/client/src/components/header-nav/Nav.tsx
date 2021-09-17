import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.scss';

export const Nav: React.FC = () => {
  return (
    <div className="nav-container">
      <nav className="header-nav">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink exact to="/about">
          About
        </NavLink>
      </nav>
    </div>
  );
};
