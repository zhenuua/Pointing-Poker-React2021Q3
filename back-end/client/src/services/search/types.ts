export type NewsApiResponse = NewsApiArticle[];

export interface NewsApiArticle {
  author: string;
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  content: string;
}

export interface Article extends Omit<NewsApiArticle, 'content'> {
  content?: string;
}
