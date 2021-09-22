import axios from 'axios';
import { newsApiConfig } from './config';

export const axiosIntstance = axios.create({
  baseURL: `https://newsapi.org/v2/everything?apiKey=${newsApiConfig.key}`,
  timeout: 5000,
});
