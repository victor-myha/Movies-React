import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { MovieStateType } from '../../store/movieReducer/movieSlice';
import { UserStateType } from '../../store/userReducer/userSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useUser = () => useAppSelector(state => state.userReducer) as UserStateType;
export const useMovies = () => useAppSelector(state => state.movieReducer) as MovieStateType;
