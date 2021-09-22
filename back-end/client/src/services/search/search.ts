import { AxiosResponse } from 'axios';
import { SortingOptions } from '../../components/radio-group/types';
import { axiosIntstance as axios } from '../axiosApi/axiosApi';
import { getArticleMapper } from '../utils/mappers/searchMapper';
import { Article } from './types';

export interface SearchOptions {
  searchValue: string;
  pageSize: number;
  page: number;
  sortMethod: SortingOptions;
}

export const searchService = {
  getArticles: async ({ searchValue, pageSize, page, sortMethod }: SearchOptions): Promise<Article[]> => {
    const response: AxiosResponse = await axios.get('', {
      params: {
        qInTitle: searchValue,
        pageSize,
        page,
        sortBy: sortMethod,
      },
    });
    return getArticleMapper(response.data.articles);
  },
};

// export const searchService = {
//   getArticles: ({ searchValue, pageSize, page, sortMethod }: SearchOptions): Promise<AxiosResponse['data']> =>
//     axios
//       .get('', {
//         params: {
//           qInTitle: searchValue,
//           pageSize,
//           page,
//           sortBy: sortMethod,
//         },
//       })
//       .then((res) => getArticleMapper(res.data.articles))
//       .catch((error: any) => console.error(error)),
// };
