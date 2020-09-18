import React, { useEffect, useState } from 'react';
import ProfileSidebar from './../../Components/ProfileSidebar/profileSidebar';
import { getUsers } from './../../FetchData/fetchData';
import { CurrentUserType } from './../../Actions/actions';
import Preloder from './../../Components/Loading/loading';
import ProfileContent from './../../Components/ProfileContent/profileContent';
import classes from './profile.module.css';

const Profile = () => {
    const [users, setUsers] = useState<Array<CurrentUserType>>([])
    const [isLoaded, setLoaded] = useState(false)
    const fetchUsers = async () => {
        const getUser = await getUsers()
        setUsers(getUser.data)
        setLoaded(true)
    }

    useEffect(() => {
       fetchUsers()
    },[])
    const localId = localStorage.getItem('id')
    const user = users.find(item => item.id === localId) as CurrentUserType
    
    return (
        !isLoaded
        ? <Preloder />
        : <div className={classes.container}>
              <ProfileSidebar user={user}/>
              <ProfileContent orderHistory={user.orderHistory}/>
          </div>
        
    )
}

export default Profile