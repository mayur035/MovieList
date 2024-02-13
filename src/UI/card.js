import React from 'react'
import classes from './card.module.css'

const Card = (props) => {
  return (
    <section className={classes.section}>
        {props.children}
    </section>
  )
}

export default Card