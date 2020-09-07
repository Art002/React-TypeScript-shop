import React, { FC } from 'react';
import classNames from 'classnames/bind';
import classes from './filterItems.module.css';

let cx = classNames.bind(classes);

type FilterItemsType = {
    category: string
    description: string
    i: number
    filterCategories: (category: string, i: number) => Promise<void>
    clicked: boolean
}

const FilterItems: FC<FilterItemsType> = ({ category, description, i, filterCategories, clicked }) => {
    return (
        <div className={cx('itemCard')}>
            <img src={require(`./../../Images/${category}.jpg`)} 
                 alt='Category' 
                 onClick={() => filterCategories(category, i)} 
                 className={cx(
                    {'clicked': clicked}
                )}/>
            <h4 className={classes.header}>{description}</h4>
        </div>
    )
}

export default FilterItems