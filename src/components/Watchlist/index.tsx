import React, { useContext } from 'react'
import { MovieContext } from '../../context/MovieContext'
import MovieCard from '../MovieCard'

const Watchlist = () => {
  const { watchlist } = useContext(MovieContext)
  return (
    <div>{watchlist.map((movie) => {
      return (
        <MovieCard movie={movie} type="blue"/>
      )
    })}</div>
  )
}

export default Watchlist