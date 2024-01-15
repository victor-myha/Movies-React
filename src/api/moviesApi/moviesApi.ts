import { instance } from '../index';

export const moviesApi = {
  getAll: async (): Promise<MovieType[]> => {
    const response = await instance.get('/movies/getAll');
    return response.data as MovieType[];
  },
  addEditMovie: async (movie: MovieType, isNew: boolean): Promise<void> => {
    const path = isNew ? 'movies/create' : 'movies/edit';

    const body = JSON.stringify(movie);
    await instance.post(path, body, { headers: { 'Content-Type': 'application/json' } });
  },
};
