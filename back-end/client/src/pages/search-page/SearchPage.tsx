import React, { ChangeEvent, FC, useState, useRef, useEffect } from 'react';
import { SearchForm } from '../../components/search-form/SearchForm';
import { LoadingMessage } from '../../components/loading-message/LoadingMessage';
import { RadioGroup } from '../../components/radio-group/RadioGroup';
import { PaginationGroup } from '../../components/pagination-group/PaginationGroup';
import { NewsContainer } from '../../components/news-container/NewsContainer';
import { NoDataMessage } from '../../components/no-data-message/NoDataMessage';
import { SortingOptions } from '../../components/radio-group/types';
import { SearchPageConfig } from './SearchPageConfig';
import { SearchOptions, searchService } from '../../services/search/search';
import { Article } from '../../services/search/types';
import './SearchPage.scss';

interface SearchPageProps {
  currentSearch: string;
  setCurrentSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchPage: FC<SearchPageProps> = ({ currentSearch, setCurrentSearch }) => {
  const [isNoData, setIsNoData] = useState(false);
  const [sortMethod, setSortMethod] = useState(SortingOptions.RELEVANCY);
  const [searchResult, setSearchResult] = useState<{ isFetching: boolean; error: Error | undefined; value: Article[] }>(
    { isFetching: false, error: undefined, value: [] }
  );
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const paginationRef = useRef<HTMLFormElement | null>(null);

  const delay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSortMethodChange = (event: ChangeEvent<HTMLFormElement>) => {
    setSortMethod(event.target.value);
  };

  const getArticles = async (options: SearchOptions) => {
    try {
      setSearchResult({ isFetching: true, error: undefined, value: searchResult.value });
      const articles = (await searchService.getArticles(options)) as Article[];
      if (!articles.length) setIsNoData(true);
      setSearchResult({ isFetching: false, error: undefined, value: articles });
      // console.log(articles);
    } catch (error: any) {
      console.error(error);
      // setIsNoData(true);
      setSearchResult({ isFetching: false, error: error as Error, value: [] });
    }
  };

  const handleOnSubmite = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchValue = searchInputRef.current!.value;
    const page = paginationRef.current!['page-select'].value;
    const pageSize = paginationRef.current!['page-size-select'].value;
    // let dataArr: [] | NewsBlogProps[] = [];
    setIsNoData(false);
    setCurrentSearch(searchValue);

    getArticles({ searchValue, pageSize, page, sortMethod });

    searchInputRef.current!.value = '';
  };

  const fetchArticles = async () => {
    if (!currentSearch) return;
    const searchValue = currentSearch;
    const page = paginationRef.current!['page-select'].value;
    const pageSize = paginationRef.current!['page-size-select'].value;
    getArticles({ searchValue, pageSize, page, sortMethod });
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="search-page-container">
      <div className="form-container">
        <SearchForm submitHandler={handleOnSubmite} inputRef={searchInputRef} />
      </div>
      <div className="controls">
        <RadioGroup
          title="Sorting method"
          currentValue={sortMethod}
          options={SearchPageConfig.sortOptions}
          handleOnChange={handleSortMethodChange}
        />
        <PaginationGroup paginationRef={paginationRef} />
      </div>
      <div className="search-result-container">
        {searchResult.isFetching ||
        (!searchResult.isFetching && (!searchResult.value.length || searchResult.error)) ? null : (
          <NewsContainer dataArr={searchResult.value} />
        )}
        {searchResult.isFetching ? <LoadingMessage /> : null}
        {isNoData || searchResult.error ? <NoDataMessage /> : null}
      </div>
    </div>
  );
};
