import React from 'react';
import classes from './slider.module.css';

const Slider = () => {
    return (
        <div className={classes.container}>
            <img src={require(`./../../Images/background.jpg`)} alt='AirMax'/>
        </div>
    )
}

export default Slider