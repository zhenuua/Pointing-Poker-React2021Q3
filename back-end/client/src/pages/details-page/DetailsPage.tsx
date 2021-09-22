/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingMessage } from '../../components/loading-message/LoadingMessage';
import { NoDataMessage } from '../../components/no-data-message/NoDataMessage';
import { NewsBlog } from '../../components/news-blog/NewsBlog';
import { Article } from '../../services/search/types';
import { searchService } from '../../services/search/search';
import { SortingOptions } from '../../components/radio-group/types';
import './DetailsPage.scss';

interface ParamsQueries {
  title: string;
}

export const DetailsPage: React.FC = () => {
  // const [isNoData, setIsNoData] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    isFetching: boolean;
    error: Error | undefined;
    value: Article | null;
  }>({ isFetching: false, error: undefined, value: null });
  const { title } = useParams<ParamsQueries>();
  const searchTitle = `${decodeURI(title)}`;

  const fetchArticle = async () => {
    try {
      setSearchResult({ isFetching: true, error: undefined, value: searchResult.value });
      const article = (
        await searchService.getArticles({
          searchValue: searchTitle,
          pageSize: 1,
          page: 1,
          sortMethod: SortingOptions.RELEVANCY,
        })
      )[0] as Article;
      setSearchResult({ isFetching: false, error: undefined, value: article });
    } catch (error: any) {
      console.error(error);
      setSearchResult({ isFetching: false, error: error as Error, value: null });
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [searchTitle]);

  return (
    <div className="details-page-container">
      <p>details page - {searchTitle} </p>
      {searchResult.isFetching ? (
        <LoadingMessage />
      ) : !searchResult.value || searchResult.error ? (
        <NoDataMessage />
      ) : (
        <NewsBlog articleData={searchResult.value} />
      )}
    </div>
  );
};
