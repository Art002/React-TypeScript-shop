import { fetchClothing, signUp, signIn, getUsers, saveNewUser, fetchCategories, changeUsersOrderHistory } from './../FetchData/fetchData';
import { ThunkActionType, ActionsType } from './../Reducers/rootReducers';
import { ClothingItemType } from './../Reducers/mainContent';
import { CategoriesType } from './../Reducers/filter';
import { InCartType } from './../Reducers/cart';
import { AxiosResponse } from 'axios';

type ParamsType = {
    email: string
    password: string
    returnSecureToken: boolean
}
export type CurrentUserType = {
    email: string
    id: string
    orderHistory: Array<InCartType>
}
export type MethodType = {
    method: (params: ParamsType) => any
}

export const getClothing = (): ThunkActionType<ActionsType> => {
    return async (dispatch) => {
        try{
            const clothing = await fetchClothing()
            dispatch(actions.saveClothingData(clothing.data))
        }catch(e){}
    }
}
export const getCategories = (): ThunkActionType<ActionsType> => {
    return async (dispatch) => {
        try{
            const categories = await fetchCategories()
            dispatch(actions.saveCategoriesData(categories.data))
        }catch(e){}
    }
}
export const filterCategories = (category: string, i: number): ThunkActionType<ActionsType> => {
    return async (dispatch, getState) => {
        const isClicked = getState().filter.categories[i].clicked
        if(!isClicked){
            const filteredItems = getState().mainContent.clothing.filter(item => item.gender === category)
            dispatch(actions.setFilter(filteredItems))
            dispatch(actions.changeFilterStatus(i))
        }else {
            dispatch(actions.undoFilter())
            dispatch(actions.changeFilterStatus(i))
        }         
    }
}
export const auth = (email: string, password: string): ThunkActionType<ActionsType> => {
    return async () => {
        try {
            const params: ParamsType = {email, password, returnSecureToken: true}
            const response = await signUp(params)
            if(response.status === 200){
                const users = await getUsers()
                users.data.push({email: response.data.email, id: response.data.localId, orderHistory: ["'"]})
                saveNewUser(users.data)
            }
        }catch(e){

        }
        
    }
}
export const logIn = (email: string, password: string): ThunkActionType<ActionsType> => {
    return async () => {
        try {
            const params: ParamsType = {email, password, returnSecureToken: true}
            const response = await signIn(params)
            saveDataInLocalStorage(response)
        }catch(e){
            
        }          
    }
}
const saveDataInLocalStorage = (response: AxiosResponse<any>) => {
    localStorage.setItem('token', response.data.idToken)
    localStorage.setItem('id', response.data.localId)
}
export const saveUsersOrder = (): ThunkActionType<ActionsType> => {
    return async (dispatch, getState) => {
        const localId = localStorage.getItem('id')
        if(localId){
            const response = await getUsers()
            const users: Array<CurrentUserType> = response.data
            const currentUser: any = users.find(item => item.id === localId)
            const currentUserIndex = users.findIndex(item => item.id === localId)
            const inCart = getState().cart.inCart
            if(currentUser.orderHistory[0] === "'"){
                const newUsersData = {...currentUser, orderHistory: [...inCart]}
                users[currentUserIndex] = {...newUsersData}
                changeUsersOrderHistory(users)
            }else {
                const newUsersData = {...currentUser, orderHistory: [...currentUser.orderHistory, ...inCart]}
                users[currentUserIndex] = {...newUsersData}
                changeUsersOrderHistory(users)
            }

        }
    }
}
export const actions = {
    saveClothingData: (clothing: Array<ClothingItemType>) => ({type: 'SAVE_CLOTHING', clothing} as const),
    saveCategoriesData: (categories: Array<CategoriesType>) => ({type: 'SAVE_CATEGORIES', categories} as const),
    setFilter: (filteredList: Array<ClothingItemType>) => ({type: 'SET_FILTER', filteredList} as const),
    changeFilterStatus: (i: number) => ({type: 'IS_CLICKED', i} as const),
    undoFilter: () => ({type: 'UNDO_FILTER'} as const),
    addToCart: (description: string, 
                price: number, 
                currentColor: string, 
                currentSize: string,
                id: string) => {
                    return {type: 'ADD_TO_CART', description, price, currentColor, currentSize, count: 1, sum: price, id} as const
                },
    countChangeHandler: (count: any, i: number, price: number) =>  {
        const sum: number = count * price
        return {type: 'QUANTITY_CHANGE', count, i, sum} as const
    },
    removeFromCart: (id: string) => ({type: 'REMOVE_FROM_CART', id} as const),
    searchHandler: (e: any) => {
        const value = e.target.value
        return {type: 'SEARCH_HANDLER', value} as const
    },
    changeLikeStatus: (id: string) => ({type: 'CHANGE_LIKE_STATUS', id} as const)
}



