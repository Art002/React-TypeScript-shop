import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import PersonIcon from '@material-ui/icons/Person';
import classes from './headerIconsBlock.module.css';

type HeaderIconsBlockPropsType = {
    inCartLength: number
    isLoggedIn: string
}
const HeaderIconsBlock: FC<HeaderIconsBlockPropsType> = ({ inCartLength, isLoggedIn }) => {
    return (
        <div className={classes.headerIconsBlock}>
            <NavLink to={isLoggedIn}>
                <span><PersonIcon /></span>
            </NavLink>
            <span><FavoriteBorderIcon /></span>
            <span>
                <NavLink to='/cart'>
                    <div className={classes.inCartLength}>
                        {inCartLength}
                    </div>
                    <ShoppingCartOutlinedIcon />
                </NavLink>
            </span>
        </div>
    )
}

export default HeaderIconsBlock