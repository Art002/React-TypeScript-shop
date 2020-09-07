import { fetchClothing } from './../FetchData/fetchData';
import { ThunkActionType } from './../Reducers/rootReducers';
import { ClothingItemType } from './../Reducers/mainContent';
import { fetchCategories } from './../FetchData/fetchData';
import { CategoriesType } from './../Reducers/filter';
import { ActionsType } from './../Reducers/rootReducers';

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

export const actions = {
    saveClothingData: (clothing: Array<ClothingItemType>) => ({type: 'SAVE_CLOTHING', clothing} as const),
    saveCategoriesData: (categories: Array<CategoriesType>) => ({type: 'SAVE_CATEGORIES', categories} as const),
    setFilter: (filteredList: Array<ClothingItemType>) => ({type: 'SET_FILTER', filteredList} as const),
    changeFilterStatus: (i: number) => ({type: 'IS_CLICKED', i} as const),
    undoFilter: () => ({type: 'UNDO_FILTER'} as const),
    addToCart: (description: string, 
                price: number, 
                currentColor: string, 
                currentSize: string) => {
                    return {type: 'ADD_TO_CART', description, price, currentColor, currentSize, count: 1, sum: price} as const
                },
    countChangeHandler: (count: any, i: number, price: number) =>  {
        const sum: number = count * price
        return {type: 'QUANTITY_CHANGE', count, i, sum} as const
    }
}



