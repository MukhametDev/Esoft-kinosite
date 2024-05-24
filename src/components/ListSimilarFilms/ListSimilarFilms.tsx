import React, { useEffect, useState } from 'react';
import styles from './ListSimilarFilms.module.scss';
import Swiper from '../Swiper/Swiper';
import axios from 'axios';

interface IPropsListSimilarFilms {
  genre: string;
}
const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const ListSimilarFilms: React.FC<IPropsListSimilarFilms> = ({ genre }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            s: genre.split(',')[0],
          },
        });
        if (data) {
          setData(data.Search);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRequest();
  }, [genre]);

  return (
    <div className={styles.swiper}>
      <h2 className={styles.title}>Список похожих фильмов</h2>
      {data && <Swiper data={data} />}
    </div>
  );
};

export default ListSimilarFilms;
