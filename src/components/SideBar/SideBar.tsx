import React from 'react';
import { useSelector } from 'react-redux';
import SideBarListFilms from '../SideBarListFilms/SideBarListFilms';
import styles from './SideBar.module.scss';
interface IPropsSideBar {}

const SideBar: React.FC<IPropsSideBar> = ({}) => {
  const favoritesFilms = useSelector((state) => state.films.favoritesFilms);
  const watchLater = useSelector((state) => state.films.watchLater);

  return (
    <div className={styles.sidebar}>
      <SideBarListFilms text={'Список любимых фильмов'} data={favoritesFilms} />
      <SideBarListFilms text={'Смотреть позже'} data={watchLater} />
    </div>
  );
};

export default SideBar;
