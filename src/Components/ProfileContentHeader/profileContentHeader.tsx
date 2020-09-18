import React from 'react';
import classes from './profileContentHeader.module.css';

const ProfileContentHeader = () => {
    return (
        <div className={classes.profileContentHeader}>
            <div className={classes.imgBlock}>Заказ</div>
            <div className={classes.sumBlock}>Сумма</div>
            <div className={classes.statusBlock}>Статус</div>
        </div>
    )
}

export default ProfileContentHeader