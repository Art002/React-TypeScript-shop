import React, { FC } from 'react';
import Input from './../Input/input';
import SearchIcon from '@material-ui/icons/Search';
import classes from './search.module.css';

const Search: FC = () => {
    return (
        <div className={classes.searchBlock}>
            <SearchIcon className={classes.searchIcon}/>
            <Input type='search' placeholder='Search for Clothes'/>
        </div>
    )
}

export default Search