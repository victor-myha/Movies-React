import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer/userSlice';

const setupStore = () =>
  configureStore({
    reducer: {
      userReducer,
    },
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
