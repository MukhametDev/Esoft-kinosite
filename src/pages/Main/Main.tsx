import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavoritesFilms,
  addToWatchLater,
  getData,
} from '../../features/movie/movieSlice';
import Header from '../../components/Header/Header';
import { Outlet } from 'react-router-dom';
import ListFilms from '../../components/ListFilms/ListFilms';
import SideBar from '../../components/SideBar/SideBar';
import styles from './Main.module.scss';

interface IPropsMain {}

export async function loader() {}

const Main: React.FC<IPropsMain> = ({}) => {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);
  const status = useSelector((state) => state.films.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getData());
    }
  }, [status, dispatch]);

  return (
    <div className={styles.main}>
      <Header />
      <>
        <div className={styles.content}>
          <Outlet />
        </div>
        <div className={styles.sidebar}>
          <SideBar />
        </div>
      </>
    </div>
  );
};

export default Main;
