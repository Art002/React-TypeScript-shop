import React, { FC } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { CurrentUserType } from './../../Actions/actions';
import classes from './profileSidebar.module.css';

type ProfileSidebarPropsType = {
    user: CurrentUserType
}
const ProfileSidebar: FC<ProfileSidebarPropsType> = ({ user }) => {
    const totalSum = user.orderHistory.reduce((sum, item) => sum + item.price, 0)
    return (
        <div className={classes.profileSidebar}>
            <ul className={classes.profileSidebarList}>
                <li>
                    <PersonIcon /> {user.email}
                </li>
                <li>
                    <ShoppingCartOutlinedIcon /> Все заказы
                </li>
                <li className={classes.total}>
                    Заказов на сумму: <br/>
                    {totalSum} грн.
                </li>
            </ul>
        </div>
    )
}

export default ProfileSidebar