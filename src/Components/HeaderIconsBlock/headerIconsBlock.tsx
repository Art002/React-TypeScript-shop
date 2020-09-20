import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PersonIcon from '@material-ui/icons/Person';
import classes from './headerIconsBlock.module.css';

type HeaderIconsBlockPropsType = {
    inCartLength: number
    likesCountLength: number
    inStorage: string | null
}
const HeaderIconsBlock: FC<HeaderIconsBlockPropsType> = ({ inCartLength, inStorage, likesCountLength }) => {
    return (
        <div className={classes.headerIconsBlock}>
            {inStorage
            ? <NavLink to='/profile'>
                <span><PersonIcon /></span>
              </NavLink>
            : <NavLink to='/login'>
                <span><AssignmentIndIcon /></span>
              </NavLink>}
            <span>
            <NavLink to='/liked'>
                <div className={classes.inCartLength}>
                    {likesCountLength}
                </div>
                <FavoriteBorderIcon />
            </NavLink>
            </span>
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