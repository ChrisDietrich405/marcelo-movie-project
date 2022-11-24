import React, { useContext } from "react";
import { MovieContext, MovieContextProps } from "../../context/MovieContext";
import { Movie } from "../../models/Movie";

interface MovieCardProps {
  movie: Movie;
  type: string;
}

const MovieCard = ({ movie, type }: MovieCardProps) => {
  const { AddMovieToWatchlistAction, addMovieToWatchedAction } =
    useContext<MovieContextProps>(MovieContext);

  return (
    <div style={{ backgroundColor: type }}>
      <h1>{movie.Title}</h1>
      <img src={movie.Poster} alt="" />
      <button onClick={() => AddMovieToWatchlistAction!(movie)}>
        add movie to watchlist
      </button>
      <button onClick={() => addMovieToWatchedAction!(movie)}>
        add movie to watched
      </button>
    </div>
  );
};

export default MovieCard;
