import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const BASE_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;


const initialState = {
    films: [],
    favoritesFilms: [],
    watchLater: [],
    status: 'idle',
    error: null,
    selectedGenre: [],
    selectedGenreSearch: []
}

export const getData = createAsyncThunk('/data', async () => {
    const popularTitles = [
        'Inception', 'The Dark Knight', 'Interstellar', 'Parasite',
        'The Godfather', 'The Shawshank Redemption', 'Pulp Fiction',
        'Forrest Gump', 'The Matrix', 'The Lord of the Rings: The Return of the King',
        'Fight Club', 'Star Wars', 'Back to the Future', 'Jurassic Park',
        'The Lion King', 'Toy Story', 'Avatar', 'Titanic',
        'The Avengers', 'Guardians of the Galaxy', 'Iron Man', 'Spider-Man',
        'Frozen', 'Harry Potter and the Sorcerer\'s Stone', 'The Wizard of Oz',
        'The Sound of Music', 'E.T. the Extra-Terrestrial', 'Finding Nemo',
        'Shrek', 'Beauty and the Beast', 'Coco', 'Zootopia', 'Inside Out',
        'Up', 'Monsters, Inc.', 'Moana', 'Ratatouille', 'The Incredibles',
        'WALL·E', 'Aladdin', 'Mulan', 'Brave', 'The Little Mermaid',
        'Big Hero 6', 'Tangled', 'How to Train Your Dragon', 'Kung Fu Panda',
        'Madagascar', 'Despicable Me', 'Ice Age', 'Toy Story 3', 'The Secret Life of Pets',
        'Cars', 'Minions', 'Sing', 'The Lego Movie', 'Frozen II',
        'The Polar Express', 'Happy Feet', 'Surf\'s Up', 'The Iron Giant',
        'The Jungle Book', 'Bambi', 'Dumbo', 'Cinderella', 'Sleeping Beauty',
        'Lady and the Tramp', 'Peter Pan', 'Alice in Wonderland', 'Pinocchio',
        'Snow White and the Seven Dwarfs', 'The Nightmare Before Christmas',
        'Coraline', 'Kubo and the Two Strings', 'The Boxtrolls', 'ParaNorman',
        'Frankenweenie', 'Hotel Transylvania', 'Cloudy with a Chance of Meatballs',
        'Megamind', 'The Boss Baby', 'Trolls', 'Storks', 'The Croods',
        'The Lorax', 'The Peanuts Movie', 'Rio', 'Planes',
        'The Good Dinosaur', 'Monsters University', 'Brave', 'Wreck-It Ralph',
        'The Princess and the Frog', 'Bolt', 'Meet the Robinsons', 'Chicken Little'
    ];
    const requests = popularTitles.map((title) => {
        return axios.get(BASE_URL, {
            params: {
                apikey: API_KEY,
                t: title
            }
        })
    })


    const responses = await Promise.all(requests);

    return responses.map((response) => ({
        title: response.data.Title,
        description: response.data.Plot,
        actors: response.data.Actors.split(', '),
        categories: response.data.Genre.split(', '),
        rating: parseFloat(response.data.imdbRating),
        photo: response.data.Poster,
        id: uuidv4(),
        imdbID: response.data.imdbID
    }));
})

const movieSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {
        addToFavoritesFilms: (state, action) => {
            state.favoritesFilms.push(action.payload)
        },
        addToWatchLater: (state, action) => {
            state.watchLater.push(action.payload);
        },
        deleteFavoritesFilmById: (state, action) => {
            const movieId = action.payload;
            state.favoritesFilms = state.favoritesFilms.filter((item) => item.id !== movieId)
        },
        deleteWatchLater: (state, action) => {
            const filmWatchId = action.payload;
            state.watchLater = state.watchLater.filter((film) => film.id !== filmWatchId)
        },
        setGenresFilter: (state, action) => {
            state.selectedGenre = action.payload;
        },
        clearGenresFilter: (state) => {
            state.selectedGenre = '';
        },
        setGenreFilter: (state, action) => {
            state.selectedGenreSearch = action.payload
        },
        clearGenreFilter: (state) => {
            state.selectedGenreSearch = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getData.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getData.fulfilled, (state, action) => {
                state.status = "successed";
                state.films = action.payload;
            })
            .addCase(getData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
})

export const {
    addToFavoritesFilms,
    addToWatchLater,
    deleteFavoritesFilmById,
    deleteWatchLater,
    setGenreFilter,
    setGenresFilter,
    clearGenresFilter,
    clearGenreFilter,
} = movieSlice.actions;
export default movieSlice.reducer;