import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './FavoriteFilm.module.scss';

interface IPropsFavoriteFilm {
  img: string;
  title: string;
  id: string;
}

const FavoriteFilm: React.FC<IPropsFavoriteFilm> = ({ title, img, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`film/${id}`);
    window.scrollTo(0, 0);
  };
  return (
    <li className={styles.card}>
      <img className={styles.img} src={img} alt="icon" />
      <h2 className={styles.title} onClick={handleClick}>
        {title}
      </h2>
    </li>
  );
};

export default FavoriteFilm;
