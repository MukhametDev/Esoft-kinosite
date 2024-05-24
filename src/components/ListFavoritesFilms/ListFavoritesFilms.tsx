import React from 'react';
import FavoriteFilm from '../FavoriteFilm/FavoriteFilm';
import { useSelector } from 'react-redux';
import styles from './ListFavoritesFilms.module.scss';

interface IPropsListFavoritesFilms {}

const ListFavoritesFilms: React.FC<IPropsListFavoritesFilms> = ({}) => {
  const favoritesFilms = useSelector((state) => state.films.favoritesFilms);
  const maxDisplay = 5; // Максимальное количество отображаемых фильмов

  return (
    <div className={styles.block}>
      <p className={styles.title}>Список любимых фильмов</p>
      <ul className={styles.list}>
        {favoritesFilms &&
          favoritesFilms.slice(0, maxDisplay).map((film) => {
            return (
              <FavoriteFilm
                key={film.imdbID}
                title={film.title}
                img={film.photo}
                id={film.imdbID}
              />
            );
          })}
      </ul>
      {favoritesFilms.length > maxDisplay && (
        <div className={styles.more}>
          И еще {favoritesFilms.length - maxDisplay}...
        </div>
      )}
    </div>
  );
};

export default ListFavoritesFilms;
