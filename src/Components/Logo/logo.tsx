import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './logo.module.css';

const Logo: FC = () => {
    return (
        <div className={classes.logo}>
            <NavLink to='/'>
                <h1>Shop Shop</h1>
            </NavLink>
        </div>
    ) 
}

export default Logo