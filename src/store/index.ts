import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './movieReducer/movieSlice';
import userReducer from './userReducer/userSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      movieReducer,
      userReducer,
    },
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
