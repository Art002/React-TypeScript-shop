import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import { ColorsType } from './../../Reducers/mainContent';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import classes from './contentItems.module.css';

let cx = classNames.bind(classes);
type ContentItemsType = {
    brand: string
    color: Array<ColorsType>
    description: string
    price: number
    id: string
    liked: boolean
    changeLikeStatus: (id: string) => void
}

const ContentItems: FC<ContentItemsType> = ({ brand, color, description, price, id, changeLikeStatus, liked }) => {
    const colorPicker = color.map(({ eng, ru }, i) => {
        return <div key={eng + i} 
                    style={{background: `${eng}`}} 
                    className={classes.colorSquare}
                ></div>
    })
    return (
        <div className={classes.itemCard}>
            <FavoriteBorderIcon className={cx({'liked': liked}, classes.itemCardLike)} onClick={() => changeLikeStatus(id)} />
            <NavLink to={`/${id}`}>
                <img src={require(`./../../Images/male.jpg`)} alt={description}/>
            </NavLink>
            <div>{description}</div>
            <div className={classes.brand}>{brand}</div>
            <div>{price} UAH</div>
            <div className={classes.colorSquareContainer}>{colorPicker}</div>
        </div>
    )
}

export default ContentItems