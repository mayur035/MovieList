import React, { useState } from 'react';
import './App.css';
import Card from './UI/card';
import Button from './UI/Button';
import MovieList from './components/movieList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchHandler = async () => {
    setIsLoading(true);
    const fetchMovie = await fetch('https://swapi.dev/api/films/');
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
    setIsLoading(false);

  }
  return (
    <React.Fragment>
      <Card>
        <Button onClick={fetchHandler}>Fetch Movie</Button>
      </Card>
      <Card>
        {!isLoading && movies.length > 0 && <MovieList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading....</p>}

      </Card>

    </React.Fragment>
  );
}

export default App;
