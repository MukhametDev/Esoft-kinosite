import { createSelector } from '@reduxjs/toolkit';

const selectFilms = (state) => state.films.films;
const selectSelectedGenres = (state) => state.films.selectedGenre;

export const selectFilmsByGenre = createSelector(
  [selectFilms, selectSelectedGenres],
  (films, selectedGenres) => {
    console.log('films:', films);
    console.log('selectedGenres:', selectedGenres);
    if (!selectedGenres || selectedGenres.length === 0) return films;
    films =  films.filter((film) =>
      selectedGenres.every((genre) => film.categories.includes(genre))
    );
    return films;
  }
);
