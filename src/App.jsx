import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

function App() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchPopularMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
            api_key: API_KEY,
        },
    });
      setMovies(response.data.results);
    }
    catch (err) {
      console.log(err);
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  const fetchMoviesSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/movie?query=${query}`, {
        params: {
            api_key: API_KEY,
        },
    });
      setMovies(response.data.results);
    }
    catch (err) {
      console.log(err);
      setError(err.message);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPopularMovies();
  }, [query] )

  return (
    <>
      <h1>Movies App</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchMoviesSearch();
      }}>
        <input type="text" onChange={e => setQuery(e.target.value)} />
        <input type="submit" />
      </form>
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
      {movies && !loading && movies.map((movie) => {
        return (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} />
            <p>Note : {movie.vote_average}/10</p>
            <p>{movie.overview}</p>
          </div>
        )
      })}
    </>
  )
}

export default App;