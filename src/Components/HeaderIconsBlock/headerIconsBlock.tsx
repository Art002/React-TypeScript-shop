import React from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonIcon from '@material-ui/icons/Person';
import classes from './headerIconsBlock.module.css';

const HeaderIconsBlock = () => {
    return (
        <div className={classes.headerIconsBlock}>
            <span><PersonIcon /></span>
            <span><FavoriteBorderIcon /></span>
            <span><ShoppingCartOutlinedIcon /></span>
        </div>
    )
}

export default HeaderIconsBlock