import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "../../api";
import { Movie } from "../../models/Movie";
import { MovieContext, MovieContextProps } from "../../context/MovieContext";
import MovieCard from "../MovieCard";

const apiKey = import.meta.env.VITE_API_KEY;

function Home() {
  const [query, setQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);

 

  const navigate = useNavigate();

  const fetchMovie = () => {
    api
      .get(`/?apikey=${apiKey}&t=${query}`)
      .then((res) => {
        setMovies([...movies, res.data]);
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          id="search-movie"
          label="search movie"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button type="submit" variant="outlined">
          Search Movie
        </Button>
      </form>
      {movies.map((movie) => {
        return <MovieCard movie={movie} />;
      })}
    </>
  );
}

export default Home;
