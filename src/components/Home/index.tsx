import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { api } from "../../api";
import { Movie } from "../../models/Movie";
import { MovieContext, MovieContextProps } from "../../context/MovieContext";
import MovieCard from "../MovieCard";

import "./styles.css";

const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchControl, setSearchControl] = useState(false)
  const { watchlist } = useContext(MovieContext);

  const navigate = useNavigate();

  
  const fetchMovie = () => {
    api
      .get(`/?apikey=${apiKey}&t=${query}`)
      .then((res) => {
        if (res.data.Response !== "False") {
          setMovies([...movies, res.data]);
        }
        setSearchControl(true)
      })
      .catch((error) => {
        if (error.response.status === 404) {
          navigate("/page-not-found");
        } else {
          toast("try again later");
        }
      });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchMovie();
  };

  const deleteMovie = (id: string) => {
    const updatedMovies = movies.filter((movie) => movie.imdbID !== id);
    setMovies(updatedMovies);
  };

const newFunc = () => {
  const updatedMovies = movies.map((movie) => {
    let foundWatchlistMovie = watchlist.find((object) => object.imdbID === movie.imdbID)
    const watchlistDisabled = foundWatchlistMovie ? true : false  
    return {
      ...movie, disabled: watchlistDisabled
    }
  })
  setMovies(updatedMovies)
}

  useEffect(() => {
    newFunc()
  }, [movies])

  const BootstrapButton = styled(Button)({
    boxShadow: "none",
    padding: "14px",
  });

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <TextField
          id="search-movie"
          label="search movie"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <BootstrapButton size="large" type="submit" variant="outlined">
          Search Movie
        </BootstrapButton>
      </form>
      <div className="movies-container">
        {searchControl && movies.length === 0 && "no movie found"}
        {movies.map((movie) => {
          return (
            <MovieCard
              // watchlistDisabled={watchlistDisabled}
              deleteMovie={deleteMovie}
              movie={movie}
              type="white"
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
