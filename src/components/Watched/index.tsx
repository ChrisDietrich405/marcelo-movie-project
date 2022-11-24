import { useContext } from 'react'
import { MovieContext } from '../../context/MovieContext'
import MovieCard from '../MovieCard'

const Watched = () => {
  const { watched } = useContext(MovieContext)
  return (
    <div>{watched.map((movie) => {
      return (
        <MovieCard movie={movie} type="red"/>
      )
    })}</div>
  )
}

export default Watched