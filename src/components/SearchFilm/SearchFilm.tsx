import React from 'react';
import styles from './SearchFilm.module.scss';
import ItemFilm from '../ItemFilm/ItemFilm';
import Swiper from '../Swiper/Swiper';

interface IData {
  Title: string;
  imdbID: string;
  Poster: string;
}

interface IPropsSearchFilm {
  film: IData[];
}

const SearchFilm: React.FC<IPropsSearchFilm> = ({ film }) => {

  return (
    <div className={styles.searchFilm}>
      <h2 className={styles.title}>Результат запроса</h2>
      <div className={styles.response}>
        {!Array.isArray(film) ? (
          <div className={styles.film}>
            <ItemFilm title={film.Title} id={film.imdbID} img={film.Poster} />
          </div>
        ) : (
          <Swiper data={film} />
        )}
      </div>
    </div>
  );
};

export default SearchFilm;
