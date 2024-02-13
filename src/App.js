import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Card from './UI/card';
import Button from './UI/Button';
import MovieList from './components/movieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchHandler = useCallback(async () => {
      setIsLoading(true);
      setIsError(null);

      try {
        const fetchMovie = await fetch('https://swapi.dev/api/films/');
        if (!fetchMovie.ok) {
          throw new Error('occcchhhhhh!Buddy Kuch issue hai....!')
        }
        const data = await fetchMovie.json();

        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          }
        })
        setMovies(transformedMovies);
      } catch (error) {
        setIsError(error.message);
      }
      setIsLoading(false)
  }, [])


  useEffect(() => {
    fetchHandler();
  }, [fetchHandler])


  return (
    <React.Fragment>
      <Card>
        <Button onClick={fetchHandler}>Fetch Movie</Button>
      </Card>
      <Card>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && !isError && <p>Found no movies.</p>}
        {!isLoading && isError && <p>{isError}</p>}
        {isLoading && <p>Loading....</p>}

      </Card>

    </React.Fragment>
  );
}

export default App;
