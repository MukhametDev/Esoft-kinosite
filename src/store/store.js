import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './../features/movie/movieSlice';
import commentReducer from '../features/comment/commentSlice'
export const store = configureStore({
    reducer: {
        films: moviesReducer,
        comment: commentReducer
    }
})