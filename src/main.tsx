import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'normalize.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'reset-css';
import ListFilms from './components/ListFilms/ListFilms.tsx';
import Film from './pages/Film/Film.tsx';
import SearchPage from './pages/SearchPage/SearchPage.tsx';
import Films from './pages/Films/Films.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Films />,
      },
      {
        path: 'film/:id',
        element: <Film />,
      },
      {
        path: '/search',
        element: <SearchPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
