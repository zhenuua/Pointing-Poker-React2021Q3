import React, { FC } from 'react';
import './searchInput.scss';

interface SearchInputProps {
  id: string;
  type: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ id, type, placeholder = '', inputRef }) => {
  return <input className="search-input" id={id} type={type} placeholder={placeholder} ref={inputRef} required />;
};
