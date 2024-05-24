import React from 'react';
import styles from './Nav.module.scss';
import { Link } from 'react-router-dom';

interface IPropsNav {}

const Nav: React.FC<IPropsNav> = ({}) => {
  return (
    <nav className={styles.navigate}>
      <Link className={styles.link} to={'/'}>
        Главная
      </Link>
      <Link className={styles.link} to={'/search'}>
        Поиск
      </Link>
    </nav>
  );
};

export default Nav;
