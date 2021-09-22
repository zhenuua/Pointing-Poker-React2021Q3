import React, { FC } from 'react';
import { SearchFormProps } from '../../interfaces/searchFormProps';
import { SearchInput } from '../search-input/searchInput';
import { SearchLabel } from '../search-label/searchLabel';
import './SearchForm.scss';

export const SearchForm: FC<SearchFormProps> = ({ submitHandler, inputRef }) => {
  const inputId = 'search-input';
  const labelText = 'Search for stuff';
  const inputType = 'search';
  const inputPlaceholder = 'Search...';
  return (
    <form className="search-form" onSubmit={submitHandler}>
      <SearchLabel forId={inputId} value={labelText} />
      <SearchInput id={inputId} type={inputType} placeholder={inputPlaceholder} inputRef={inputRef} />
      <button className="search-button" type="submit">
        Go
      </button>
    </form>
  );
};
