import axios from 'axios';
import { CurrentUserType } from './../Actions/actions';

type paramsType = {
    email: string
    password: string
    returnSecureToken: boolean
}

export const fetchClothing = () => {
    return axios.get('https://clothing-shop-f1230.firebaseio.com/-MFr-Ws9CLguaHrCGq_s.json')   
}
export const fetchCategories = () => {
    return axios.get('https://clothing-shop-f1230.firebaseio.com/-MG-8vjrYU1n6WEjH3MD.json')
}
export const signUp = (params: paramsType) => {
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCB0xt1rFiZBKy4GafgfZxBw7uP4SJnrFw', params)
}
export const signIn = (params: paramsType) => {
    return axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCB0xt1rFiZBKy4GafgfZxBw7uP4SJnrFw', params)
}
export const saveNewUser = (params: Array<CurrentUserType>) => {
    return axios.put('https://clothing-shop-f1230.firebaseio.com/users.json', params)
}
export const getUsers = () => {
    return axios.get('https://clothing-shop-f1230.firebaseio.com/users.json')
}
export const changeUsersOrderHistory = (params: Array<CurrentUserType>) => {
    return axios.put('https://clothing-shop-f1230.firebaseio.com/users.json', params)
}

