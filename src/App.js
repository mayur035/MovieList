import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import Card from './UI/card';
import Button from './UI/Button';
import MovieList from './components/movieList';
import AddMovie from './components/addMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const fetchHandler = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const fetchMovie = await fetch('https://movielist-8dfb3-default-rtdb.firebaseio.com/movies.json');
      if (!fetchMovie.ok) {
        throw new Error('occcchhhhhh!Buddy Kuch issue hai....!')
      }
      const data = await fetchMovie.json();

      const loadedMovies=[]

      for (const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      // const transformedMovies = data.results.map((movieData) => {
      //   return {
      //     // id: movieData.id,
      //     title: movieData.movies.title,
      //     openingText: movieData.openingText,
      //     releaseDate: movieData.releaseDate,
      //   }
      // })
      setMovies(loadedMovies);
    } catch (error) {
      setIsError(error.message);
    }
    setIsLoading(false)
  }, [])


  useEffect(() => {
    fetchHandler();
  }, [fetchHandler])

  const addMovieHandler = async (movie) => {
    const response = await fetch('https://movielist-8dfb3-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    console.log(data);
  }

  return (
    <React.Fragment>
      <Card>
        <AddMovie onAddMovie={addMovieHandler} />
      </Card>
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
