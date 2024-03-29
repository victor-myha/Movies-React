import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { PaletteMode, ThemeProvider, styled } from '@mui/material';
import { colors, themeStyle } from './assets/theme';
import { Footer, ProtectRoute } from './commons/index';
import { AuthPage } from './pages';
import EditMoviePage from './pages/EditMoviePage/EditMoviePage';
import MoviesListPage from './pages/MoviesListPage/MoviesListPage';
import { auth } from './store/userReducer/userSlice';
import { getFromLocalStorage } from './utils';
import { APP_STORE } from './utils/constants';

const AppContainer = styled('div')(() => ({
  background: colors.background,
  width: '100vw',
  height: '100vh',
  overflowY: 'auto',
}));

const App = () => {
  const [theme] = useState<PaletteMode>('light');
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getFromLocalStorage(APP_STORE.USER) as UserType | undefined;
    if (user) {
      dispatch(auth(user));
    }
  }, []);

  return (
    <ThemeProvider theme={themeStyle(theme)}>
      <AppContainer>
        <Routes>
          <Route path={'/'} element={<ProtectRoute isSecured children={<MoviesListPage />} />} />
          <Route path={'/new-movie'} element={<ProtectRoute isSecured children={<EditMoviePage isNew />} />} />
          <Route path={'/edit-movie'} element={<ProtectRoute isSecured children={<EditMoviePage />} />} />
          <Route path={'/sign-in'} element={<ProtectRoute children={<AuthPage />} />} />
          <Route path={'/sign-up'} element={<ProtectRoute children={<AuthPage isRegistration />} />} />
          <Route path='*' element={<Navigate to={'/'} replace />} />
        </Routes>
        <Footer />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
