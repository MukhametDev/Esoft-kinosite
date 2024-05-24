import React from 'react';
import styles from './Header.module.scss';
import SortByGenre from '../SortByGenre/SortByGenre';
import { Link } from 'react-router-dom';
import Nav from '../Nav/Nav';

interface IPropsHeader {}

const Header: React.FC<IPropsHeader> = ({}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Список популярных фильмов</h1>
      <Nav />
    </header>
  );
};

export default Header;
