import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type MovieStateType = {
  movies: MovieType[];
};

const initialState: MovieStateType = {
  movies: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    characterToggleLike(state, { payload }: PayloadAction<string>) {},
  },
});

export const { characterToggleLike } = movieSlice.actions;
export default movieSlice.reducer;
