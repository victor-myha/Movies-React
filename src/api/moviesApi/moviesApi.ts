import { instance } from '../index';

export const moviesApi = {
  getAll: async (): Promise<MovieType[]> => {
    const response = await instance.get('/movies/getAll');
    console.log(response);
    return response.data as MovieType[];
  },
};
