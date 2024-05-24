import React from 'react';
import ItemFilm from '../ItemFilm/ItemFilm';

interface IData {
  title: string;
  description: string;
  actors: string[];
  rating: number;
  categories: string[];
  img: string;
}

interface IPropsSearchListFilmss {
  data: IData[];
}

const SearchListFilms: React.FC<IPropsSearchListFilmss> = ({ data }) => {
  return (
    <div>
      {/* {data &&
        data.map((item) => {
          return <ItemFilm />;
        })} */}
    </div>
  );
};

export default SearchListFilms;
