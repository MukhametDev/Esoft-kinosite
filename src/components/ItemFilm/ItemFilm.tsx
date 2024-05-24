import React from 'react';
import styles from './ItemFilm.module.scss';
import { CiStar } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegBookmark } from 'react-icons/fa6';

interface IPropsItemFilm {
  title: string;
  description: string;
  actors: string[];
  rating: number;
  categories: string[];
  img: string;
  handleClickHeart: (film: IPropsItemFilm) => void;
  film: IPropsItemFilm;
  clickHeart: boolean;
  id: string;
  clickWatch: boolean;
  handleClickWatch: (film: IPropsItemFilm) => void;
}

const ItemFilm: React.FC<IPropsItemFilm> = React.memo(
  ({
    title,
    description,
    actors,
    rating,
    categories,
    img,
    handleClickHeart,
    film,
    clickHeart,
    clickWatch,
    id,
    handleClickWatch,
  }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/film/${id}`, { replace: true });
    };
    return (
      <li className={styles.card}>
        <FaRegBookmark
          onClick={() => handleClickWatch(film)}
          className={clickWatch ? styles.watchOn : styles.watchOff}
        />
        <FaHeart
          onClick={() => handleClickHeart(film)}
          className={clickHeart ? styles.active : styles.heart}
        />

        <img src={img} alt="photo" />
        <div className={styles.content}>
          <div className={styles.link} onClick={handleClick}>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <p className={styles.description}>
            <span className={styles.desc}>Описание: </span>
            {description}
          </p>
          <p className={styles.actors}>
            <span className={styles.actor}>Актерский состав: </span>
            {actors}
          </p>
          <p className={styles.categories}>
            <span className={styles.genre}>Жанры:</span>
            {categories?.map((item, index) => {
              return <span key={index}>{item}</span>;
            })}
          </p>
          <span className={styles.rating}>
            Рейтинг - {rating}{' '}
            <span>
              <CiStar className={styles.star} />
              <CiStar className={styles.star} />
              <CiStar className={styles.star} />
            </span>
          </span>
        </div>
      </li>
    );
  }
);

export default ItemFilm;
