import React from "react";
import classes from './movieList.module.css'
import Movie from "./movie";

const MovieList = (props) => {
    return (
        <ul className={classes['movies-list']}>
            {props.movies.map((movie) => {
                return (
                    <Movie
                        title={movie.title}
                        releaseDate={movie.releaseDate}
                        openingText={movie.openingText}
                    />
                )
            })}
        </ul>
    )
}

export default MovieList;