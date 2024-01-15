import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, IconButton } from '@mui/material';
import { moviesApi } from '../../api';
import { IconAddCircle, IconLogout } from '../../assets/icons';
import { Header } from '../../commons';
import { Content, MovieCard, MovieImg, MovieTitle, MovieYear, TextWithButton } from './_components';

const MoviesListPage: FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getAll()
      .then(movies => {
        setMovies(movies);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header>
        <TextWithButton>
          <h2>My movies</h2>
          <IconButton sx={{ margin: '5px 0 0 0' }} onClick={() => navigate('/new-movie')}>
            <IconAddCircle />
          </IconButton>
        </TextWithButton>
        {isLoading && <CircularProgress />}
        <TextWithButton>
          <h6>Logout</h6>
          <IconButton sx={{ margin: '5px 0 0 0' }}>
            <IconLogout />
          </IconButton>
        </TextWithButton>
      </Header>
      <Content>
        {movies.map(movie => (
          <MovieCard key={movie.id} onClick={() => navigate('/edit-movie')}>
            <MovieImg width={'100%'} height={'100%'} src={movie.img} alt='Movie' />
            <MovieTitle>{movie.title}</MovieTitle>
            <MovieYear>{movie.year}</MovieYear>
          </MovieCard>
        ))}
      </Content>
    </>
  );
};

export default MoviesListPage;
