import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const[isLoading, setIsLoading] = useState(false);

  async function fetchMovieshandler() {
    setIsLoading(true);
    const response = await fetch(" https://swapi.dev/api/films/ ");
    //converting data to json
    // .then((response) => {
    //   return response.json();
    // })

    const data = await response.json();

    //storing converted json data
    const transformedMovies = data.results.map((movieData) => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });

    setMovies(transformedMovies);
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieshandler}>Fetch Movies</button>
      </section>
      <section>
      { !isLoading &&   <MoviesList movies={movies} />}
      {!isLoading && movies.length === 0 && <p>Found No Movies. </p>}
      {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
