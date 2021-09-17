import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatchPage.scss';

export const NoMatchPage: React.FC = () => {
  return (
    <div className="no-match-page-container">
      <p>page not found</p>
      <Link to="/">Back to home page...</Link>
    </div>
  );
};
