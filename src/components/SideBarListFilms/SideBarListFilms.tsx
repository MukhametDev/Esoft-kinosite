import React from 'react';
import styles from './SideBarListFilms.module.scss';
import FavoriteFilm from '../FavoriteFilm/FavoriteFilm';

interface IPropsWatchListFilms {
  text: string;
  data: IData[];
}
interface IData {
  photo: string;
  title: string;
  imdbID: string;
  id: string;
  description: string;
  actors: string[];
  rating: number;
  categories: string[];
}
const SideBarListFilms: React.FC<IPropsWatchListFilms> = ({ text, data }) => {
  const maxDisplay = 5; // Максимальное количество отображаемых фильмов

  return (
    <>
      {data.length !== 0 && (
        <div className={styles.block}>
          <p className={styles.title}>{text}</p>
          <ul className={styles.list}>
            {data &&
              data.map((film) => {
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
        </div>
      )}
    </>
  );
};

export default SideBarListFilms;
