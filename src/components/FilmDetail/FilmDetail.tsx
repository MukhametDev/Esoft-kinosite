import React from 'react';
import styles from './FilmDetail.module.scss';
import { CiStar } from 'react-icons/ci';

interface IPropsFilmDetail {
  title: string;
  description: string;
  actors: string[];
  rating: number;
  categories: string;
  img: string;
  country: string;
}

const FilmDetail: React.FC<IPropsFilmDetail> = ({
  country,
  title,
  description,
  actors,
  rating,
  categories,
  img,
}) => {
  return (
    <div className={styles.film}>
      <img src={img} alt="photo" />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>
          <span className={styles.desc}>Описание: </span>
          {description}
        </p>
        <p className={styles.country}>
          <span>Страна - </span>
          {country}
        </p>
        <p className={styles.actors}>
          <span className={styles.actor}>Актерский состав: </span>
          {actors}
        </p>
        <p className={styles.categories}>
          <span className={styles.genre}>Жанры:</span>
          {categories.split(',').map((item, index) => {
            return <span key={index}>{item}</span>;
          })}
        </p>
        <span className={styles.rating}>
          <span className={styles.rate}>Рейтинг - {rating} </span>
        </span>
      </div>
    </div>
  );
};

export default FilmDetail;
