import React, { FC } from 'react';
import classes from './profileContentItem.module.css';

type ProfileContentItemPropsType = {
    description: string
    currentColor: string
    currentSize: string
    price: number
    count: number
    sum: number
}
const ProfileContentItem: FC<ProfileContentItemPropsType> = ({ description, currentColor, currentSize, price, count, sum }) => {
    return (
        <div className={classes.profileContentItem}>
            <div className={classes.imgBlock}>
                    <img src={require(`./../../Images/male.jpg`)} alt={description}/>
                    <div className={classes.imgBlockInfo}>
                        <div className={classes.imgBlockInfoName}>
                            {description}
                            <br/>
                            <div className={classes.colorBlock}>Цвет: {currentColor}</div>
                        </div>
                        <div className={classes.imgBlockInfoPrice}>
                            Цена: {price}
                        </div>
                    </div>
                </div>
                <div className={classes.sumBlock}>
                    <span>{sum}</span>
                </div>
                <div className={classes.statusBlock}>
                    Выполнен
                </div>
        </div>
    )
}

export default ProfileContentItem