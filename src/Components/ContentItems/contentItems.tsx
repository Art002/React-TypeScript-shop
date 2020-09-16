import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { ColorsType } from './../../Reducers/mainContent';
import classes from './contentItems.module.css';

type ContentItemsType = {
    brand: string
    color: Array<ColorsType>
    description: string
    price: number
    id: string
}

const ContentItems: FC<ContentItemsType> = ({ brand, color, description, price, id }) => {
    const colorPicker = color.map(({ eng, ru }, i) => {
        return <div key={eng + i} 
                    style={{background: `${eng}`}} 
                    className={classes.colorSquare}
                ></div>
    })
    return (
        <div className={classes.itemCard}>
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