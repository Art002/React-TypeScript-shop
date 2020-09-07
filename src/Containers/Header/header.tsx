import React from 'react';
import Logo from './../../Components/Logo/logo';
import Search from './../../Components/Search/search';
import ShoppingCartIcon from './../../Components/HeaderIconsBlock/headerIconsBlock';
import classes from './header.module.css';

const Header = () => {
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <Logo />
                <Search />
                <ShoppingCartIcon />
            </div>
        <hr className={classes.borderBottom}/>
        </div>
    )
}

export default Header