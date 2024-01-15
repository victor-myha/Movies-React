import axios from 'axios';

export { moviesApi } from './moviesApi/moviesApi';
export { userApi } from './userApi/userApi';

export const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API!,
  headers: {
    'Access-Control-Allow-Origin': '*',
    // Accept: '*/*',
    // Connection: 'keep-alive',
  },
});
