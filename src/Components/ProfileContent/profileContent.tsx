import React, { FC } from 'react';
import { InCartType } from './../../Reducers/cart';
import ProfileContentItem from './../ProfileContentItem/profileContentItem';
import ProfileContentHeader from './../ProfileContentHeader/profileContentHeader';
import classes from './profileContent.module.css';

type ProfileContentPropsType = {
    orderHistory: Array<InCartType>
}
const ProfileContent: FC<ProfileContentPropsType> = ({ orderHistory }) => {
    const content = orderHistory.map(({ description, currentColor, currentSize, price, count, sum, id }, i) => {
        return <ProfileContentItem description={description}
                                   currentColor={currentColor}
                                   currentSize={currentSize}
                                   price={price}
                                   count={count}
                                   sum={sum}
                                   key={id + i}/>
    })
    return (
        <div className={classes.container}>
            <ProfileContentHeader />
            <div className={classes.profileContent}>
                {content}
            </div>
        </div>
    )
}

export default ProfileContent