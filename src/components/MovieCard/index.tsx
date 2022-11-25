import React, { useContext } from "react";
import { MovieContext, MovieContextProps } from "../../context/MovieContext";
import { Movie } from "../../models/Movie";
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';


import "./styles.css"

interface MovieCardProps {
  movie: Movie;
  type: string;
  deleteMovie: (id: string) => void
}

const MovieCard = ({ movie, type, deleteMovie }: MovieCardProps) => {
  const { AddMovieToWatchlistAction, addMovieToWatchedAction } =
    useContext<MovieContextProps>(MovieContext);

    const BootstrapButton = styled(Button)({
      marginTop: "10px",
      marginRight: "10px", 
      width: '35px',
      padding: "16px 44px",
      gap: "10px"
    })

  return (
    <div className="movie-card-container" style={{ backgroundColor: type }}>
      <h4>{movie.Title}</h4>
      <BootstrapButton
        
        type="submit"
        variant="outlined"
        onClick={() => deleteMovie(movie.imdbID)}
        >
        delete
      </BootstrapButton>
      <img style={{width: "200px"}} src={movie.Poster} alt="" />
      <div className="button-container">

      <BootstrapButton
        //disabled={watchlist}
        type="submit"
        variant="outlined"
        onClick={() => AddMovieToWatchlistAction!(movie)}
        >
        + watchlist
      </BootstrapButton>
      <BootstrapButton
        type="submit"
        variant="outlined"
        onClick={() => addMovieToWatchedAction!(movie)}
        >
        + watched
      </BootstrapButton>
        </div>
    </div>
  );
};

export default MovieCard;
