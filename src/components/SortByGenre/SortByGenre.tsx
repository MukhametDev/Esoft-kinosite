import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import styles from './SortByGenre.module.scss';
import { useDispatch } from 'react-redux';
import {
  setGenresFilter,
  setGenreFilter,
  clearGenresFilter,
  clearGenreFilter,
} from './../../features/movie/movieSlice';

const animatedComponents = makeAnimated();
interface IPropsSortByGenre {
  flag: boolean;
  selectedGenres: string[] | string;
  handleChandeGenre: (selectedGenres: any) => void;
  isSearchPage: boolean;
}

const SortByGenre: React.FC<IPropsSortByGenre> = ({
  selectedGenres,
  flag,
  handleChandeGenre,
  isSearchPage,
}) => {
  const dispatch = useDispatch();

  const handleGenreChange = (selectedOptions: any) => {
    const genres = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];

    if (genres.length > 0) {
      if (isSearchPage) {
        dispatch(setGenreFilter(genres));
      } else {
        dispatch(setGenresFilter(genres));
      }
    } else {
      if (isSearchPage) {
        dispatch(clearGenreFilter());
      } else {
        dispatch(clearGenresFilter());
      }
    }
  };

  const options = [
    { value: 'Drama', label: 'Драма' },
    { value: 'Action', label: 'Экшэн' },
    { value: 'Crime', label: 'Криминал' },
    { value: 'Romance', label: 'Романтические' },
    { value: 'Sci-Fi', label: 'Научные' },
    { value: 'Fantasy', label: 'Фантастика' },
    { value: 'Adventure', label: 'Приключения' },
    { value: 'Animation', label: 'Животные' },
    { value: 'Comedy', label: 'Комедия' },
    { value: 'Family', label: 'Семейные' },
    { value: 'Biography', label: 'Биографические' },
  ];

  const selectedOptions =
    selectedGenres &&
    selectedGenres.map((genre) =>
      options.find((option) => option.value === genre)
    );

  return (
    <Select
      options={options}
      components={animatedComponents}
      closeMenuOnSelect={false}
      className={styles.select}
      isMulti={flag}
      placeholder="Выберите жанры фильмов"
      value={selectedOptions}
      onChange={handleGenreChange}
    />
  );
};

export default SortByGenre;
