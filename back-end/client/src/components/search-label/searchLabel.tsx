import React, { FC } from 'react';
import './searchLabel.scss';

interface SearchLabelProps {
  forId: string;
  value: string;
}

export const SearchLabel: FC<SearchLabelProps> = ({ forId, value }) => {
  return (
    <label htmlFor={forId} className="search-label">
      {value}
    </label>
  );
};
