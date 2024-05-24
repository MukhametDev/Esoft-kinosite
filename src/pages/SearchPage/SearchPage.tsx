import React, { useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import styles from './SearchPage.module.scss';
import ItemFilm from '../../components/ItemFilm/ItemFilm';
import SearchFilm from '../../components/SearchFilm/SearchFilm';

interface IPropsSearchPage {}

const SearchPage: React.FC<IPropsSearchPage> = ({}) => {
  const [film, setFilm] = useState(null);
  return (
    <div className={styles.searchPage}>
      <h2 className={styles.title}>Форма поиска подходящего фильма</h2>
      <SearchForm film={film} setFilm={setFilm} />
      {film && <SearchFilm film={film} />}
    </div>
  );
};

export default SearchPage;
