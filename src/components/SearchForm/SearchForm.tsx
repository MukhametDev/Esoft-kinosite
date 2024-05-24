import React, { useState } from 'react';
import SortByGenre from '../SortByGenre/SortByGenre';
import styles from './SearchForm.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { clearGenreFilter } from './../../features/movie/movieSlice.js';

interface IPropsSearchForm {
  film: any;
  setFilm: (film: any) => void;
}
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const SearchForm: React.FC<IPropsSearchForm> = ({ film, setFilm }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const selectedGenres = useSelector(
    (state: any) => state.films.selectedGenreSearch
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (title.length !== 0) {
      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            t: title,
          },
        });
        if (selectedGenres.length > 0) {
          const filmGenres = data.Genre.split(',').map((genre: string) =>
            genre.trim()
          );
          const isMatchingGenres = selectedGenres.every((genre: string) =>
            filmGenres.includes(genre)
          );
          const filmData = isMatchingGenres ? data : null;
          setFilm(filmData);
          dispatch(clearGenreFilter());
        } else {
          setFilm(data);
          dispatch(clearGenreFilter());
        }
        setTitle('');
      } catch (error: any) {
        setError(error.message);
        dispatch(clearGenreFilter());
      }
    } else if (selectedGenres?.length > 0 && title.length === 0) {
      try {
        const requests = selectedGenres.map((genre: string) =>
          axios.get(BASE_URL, {
            params: {
              apikey: API_KEY,
              s: genre,
            },
          })
        );
        const responses = await Promise.all(requests);
        const films = responses.flatMap((response) => response.data.Search);
        console.log(films);
        setFilm(films);
        dispatch(clearGenreFilter());
      } catch (error: any) {
        console.log(error);
        setError(error.message);
        dispatch(clearGenreFilter());
      }
    } else {
      setError('Пожалуйста, введите название фильма или выберите жанр.');
    }
  };

  return (
    <>
      <form onSubmit={handleSearch} className={styles.form}>
        <div>
          <input
            className={styles.input}
            type="text"
            value={title}
            placeholder="Введите название фильма"
            onChange={handleTitleChange}
          />
        </div>
        <div className={styles.genre}>
          <SortByGenre
            selectedGenres={selectedGenres}
            flag={true}
            isSearchPage={true}
          />
        </div>
        <div className={styles.block}>
          <button type="submit" className={styles.btn}>
            Отправить
          </button>
        </div>
      </form>
      {error && (
        <div className={styles.error}>По вашему запросу ничего не найдено!</div>
      )}
    </>
  );
};

export default SearchForm;
