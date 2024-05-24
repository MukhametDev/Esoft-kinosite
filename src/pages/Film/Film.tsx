import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import ItemFilm from '../../components/ItemFilm/ItemFilm';
import FilmDetail from '../../components/FilmDetail/FilmDetail';
import styles from './Film.module.scss';
import ListSimilarFilms from '../../components/ListSimilarFilms/ListSimilarFilms';
import Comment from '../../components/Comment/Comment';

interface IPropsFilm {}
const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const Film: React.FC<IPropsFilm> = ({}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [film, setFilm] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            i: id,
          },
        });
        setFilm(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <ProgressBar
            visible={true}
            height="200"
            width="200"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            barColor="green"
            borderColor="#fff"
          />
        </div>
      ) : (
        film && (
          <div className={styles.content}>
            <FilmDetail
              title={film.Title}
              description={film.Plot}
              actors={film.Actors}
              rating={parseFloat(film.imdbRating)}
              categories={film.Genre}
              img={film.Poster}
              country={film.Country}
            />
            <ListSimilarFilms genre={film.Genre} />
          </div>
        )
      )}
      <Comment />
    </div>
  );
};

export default Film;
