import React from 'react';
import { Link } from 'react-router-dom';
// import { NewsBlogProps } from '../../interfaces/NewsBlogProps';
import { Article } from '../../services/search/types';
import './NewsBlog.scss';

interface NewsBlogProps {
  articleData: Article;
  shortView?: boolean;
}

export const NewsBlog: React.FC<NewsBlogProps> = ({
  articleData: { author, title, description, publishedAt, urlToImage, content },
  shortView = false,
}) => {
  const decodedTitle = encodeURI(title);
  // console.log(decodedTitle);
  const toDetails = `/details/${decodedTitle}`;

  return (
    <>
      <div className="raw1">
        <img src={urlToImage} alt="news-blog" />
        <div className="news-head">
          <div className="news-blog-title">{title}</div>
          <div className="news-blog-specifics">
            <p className="news-blog-author">by {author}</p>
            <p className="news-blog-date">published at {publishedAt.slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <div className="raw2">
        <p>{description}</p>
      </div>
      {!shortView && <p>{content}</p>}
      <div className="raw3">
        <button type="button">
          <Link to={toDetails}>Read more...</Link>
        </button>
        {/* переделать на юсХистори */}
      </div>
    </>
  );
};
