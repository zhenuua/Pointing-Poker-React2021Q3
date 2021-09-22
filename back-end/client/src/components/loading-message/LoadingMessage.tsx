import React from 'react';
import './LoadingMessage.scss';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="search-loader-container">
      <div className="search-loader">
        <span />
      </div>
    </div>
  );
};
