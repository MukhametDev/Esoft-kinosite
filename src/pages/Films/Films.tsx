import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SortByGenre from '../../components/SortByGenre/SortByGenre';
import styles from './Films.module.scss';
import ListFilms from '../../components/ListFilms/ListFilms';
import { getData } from '../../features/movie/movieSlice';

interface IPropsFilms {}

const Films: React.FC<IPropsFilms> = ({}) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.films.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getData());
    }
  }, [dispatch, status]);

  const selectedGenres = useSelector((state) => state.films.selectedGenre);

  return (
    <div>
      <div className={styles.sort}>
        <SortByGenre selectedGenres={selectedGenres} flag={true} />
      </div>
      <ListFilms />
    </div>
  );
};

export default Films;
