import { createContext, useReducer, useEffect } from "react";
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
  deleteMovie?: (id: number) => void
}

// const value = localStorage.getItem("teeMeasuresAverages");

// const parseForStorage = () => {
//   const watchlistValue = localStorage.getItem("watchlist");
//   if (typeof watchlistValue === "string") {
//     const parse = JSON.parse(watchlistValue);
//     return parse;
//   }
// };


// export const initialState: MovieContextProps = {
//   watchlist: localStorage.getItem("watchlist")
//   ? JSON.parse(`${localStorage.getItem('watchlist')}`) : [],
//   watched: [],
// };

export const initialState: MovieContextProps = {
  watchlist: [],
  watched: []
}

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

  const deleteMovie = (id: number) => {
    dispatch({type: "DELETE_MOVIE", payload: id})
  }

  useEffect(() => {
    const watchlistArray = localStorage.getItem("watchlist")
    if(watchlistArray) {
      dispatch({type: "LOAD_WATCHLIST", payload: JSON.parse(watchlistArray)})
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(state.watched))
  }, [state.watchlist, state.watched]);

  return (
    <MovieContext.Provider
      value={{
        deleteMovie,
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
