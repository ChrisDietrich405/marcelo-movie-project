import { createContext, useReducer } from "react";
import { MovieReducer } from "./MovieReducer";
import { Movie } from "../models/Movie";

interface MovieProviderProps {
  children: JSX.Element;
}

export interface MovieContextProps {
  watchlist: Movie[];
  watched: Movie[];
  AddMovieToWatchlistAction?: (movie: Movie) => void;
  addMovieToWatchedAction?: (movie: Movie) => void;
}

export const initialState: MovieContextProps = {
  watchlist: [],
  watched: [],
};

export const MovieContext = createContext<MovieContextProps>(
  {} as MovieContextProps
);

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  const AddMovieToWatchlistAction = (movie: Movie): void => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const addMovieToWatchedAction = (movie: Movie): void => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  return (
    <MovieContext.Provider
      value={{
        addMovieToWatchedAction,
        AddMovieToWatchlistAction,
        watchlist: state.watchlist,
        watched: state.watched,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
