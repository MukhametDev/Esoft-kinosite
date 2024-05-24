import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemFilm from './../ItemFilm/ItemFilm';
import styles from './ListFilms.module.scss';
import { ProgressBar } from 'react-loader-spinner';
import {
  addToFavoritesFilms,
  deleteFavoritesFilmById,
  deleteWatchLater,
  addToWatchLater,
} from '../../features/movie/movieSlice';
import { selectFilmsByGenre } from '../../selectors/filterSelector/filterSelector';

interface IPropsListFilms {}

const ListFilms: React.FC<IPropsListFilms> = ({}) => {
  const [clickHeart, setClickHeart] = useState<{ [key: string]: boolean }>({});
  const [clickWatch, setClickWatch] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();
  const films = useSelector(selectFilmsByGenre);
  const status = useSelector((state) => state.films.status);
  const favoritesFilms = useSelector((state) => state.films.favoritesFilms);
  const watchFilmsLater = useSelector((state) => state.films.watchLater);

  const handleClickHeart = useCallback(
    (film) => {
      const isFavorite = favoritesFilms.some((item) => item.id === film.id);
      setClickHeart((prevState) => ({
        ...prevState,
        [film.id]: !prevState[film.id],
      }));
      if (isFavorite) {
        dispatch(deleteFavoritesFilmById(film.id));
      } else {
        dispatch(addToFavoritesFilms(film));
      }
    },
    [dispatch, favoritesFilms]
  );

  const handleClickWatch = useCallback(
    (film) => {
      const isWatchLater = watchFilmsLater.some((el) => el.id === film.id);

      setClickWatch((prev) => ({
        ...prev,
        [film.id]: !prev[film.id],
      }));

      if (isWatchLater) {
        dispatch(deleteWatchLater(film.id));
      } else {
        dispatch(addToWatchLater(film));
      }
    },
    [dispatch, watchFilmsLater]
  );

  return (
    <>
      {status === 'loading' && (
        <div className={styles.loader}>
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            barColor="green"
            borderColor="#fff"
          />
        </div>
      )}
      {status === 'successed' && (
        <ul className={styles.list}>
          {films.map((film) => {
            return (
              <ItemFilm
                title={film.title}
                description={film.description}
                rating={film.rating}
                categories={film.categories}
                actors={film.actors}
                img={film.photo}
                key={film.id}
                handleClickHeart={handleClickHeart}
                film={film}
                id={film.imdbID}
                clickHeart={clickHeart[film.id] || false}
                clickWatch={clickWatch[film.id] || false}
                handleClickWatch={handleClickWatch}
              />
            );
          })}
        </ul>
      )}
      {status === 'failed' && <div>Failed to load films.</div>}
    </>
  );
};

export default ListFilms;
