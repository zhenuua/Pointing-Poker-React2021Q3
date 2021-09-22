import React from 'react';
import { Article } from '../../services/search/types';
import { NewsBlog } from '../news-blog/NewsBlog';
import './NewsContainer.scss';

interface NewsContainerProps {
  dataArr: Article[] | [];
}

export const NewsContainer: React.FC<NewsContainerProps> = ({ dataArr }) => {
  return (
    <ul className="news-container">
      {dataArr.map((news, index) => {
        const key = `${news.author}-${index}`;
        return (
          <li className="news-blog" key={key}>
            <NewsBlog articleData={news} shortView />
          </li>
        );
      })}
    </ul>
  );
};
