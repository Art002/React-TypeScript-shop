import React, { FC } from 'react';
import Input from './../Input/input';
import SearchIcon from '@material-ui/icons/Search';
import classes from './search.module.css';

type SearchPropsType = {
    searchHandler: (e: any) => void
}
const Search: FC<SearchPropsType> = ({ searchHandler }) => {
    return (
        <div className={classes.searchBlock}>
            <SearchIcon className={classes.searchIcon}/>
            <Input type='search' placeholder='Search for Clothes' changeHandler={searchHandler}/>
        </div>
    )
}

export default Search