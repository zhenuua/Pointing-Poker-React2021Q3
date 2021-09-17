import { NewsApiResponse, Article } from '../../search/types';

export const getArticleMapper = (articles: NewsApiResponse): Article[] =>
  articles.map((article) => {
    const { author, title, description, publishedAt, urlToImage, content } = article;
    return { author, title, description, publishedAt, urlToImage, content };
  });
