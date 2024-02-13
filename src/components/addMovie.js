import React, { useRef } from 'react'
import classes from './addMovie.module.css'

const AddMovie = (props) => {
    const titleRef = useRef();
    const openingTextRef = useRef();
    const releaseDate = useRef();

    const submitHandler = (e) => {
        e.preventDefault();

        const movie = {
            title: titleRef.current.value,
            openingText: openingTextRef.current.value,
            releaseDate: releaseDate.current.value
        }

        props.onAddMovie(movie);
    }
    return (
        <form onSubmit={submitHandler}>
            <div className={classes.control}>
                <label hmtlFor='title'>Title</label>
                <input id='title' type="text" ref={titleRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='opening-text'>Opening Text</label>
                <input type="text" id='opening-text' ref={openingTextRef} />
            </div>
            <div className={classes.control}>
                <label htmlFor='date'>Release Date</label>
                <input type="date" id='date' ref={releaseDate} />
            </div>

            <button >Add Movie</button>
        </form>
    )
}

export default AddMovie