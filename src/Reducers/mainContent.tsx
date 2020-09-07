import { ActionsType } from './../Reducers/rootReducers';

export type ClothingItemType = {
    brand: string,
    color: Array<string>,
    description: string,
    gender: string,
    id: string,
    img: string,
    liked: boolean,
    price: number,
    size: Array<string>
}

type InitialStateType = {
    clothing: Array<ClothingItemType>
    isLoaded: boolean
    filteredClothing: Array<ClothingItemType>
}
const initialState: InitialStateType = {
    clothing: [],
    filteredClothing: [],
    isLoaded: false
}

export default function content(
    state: InitialStateType = initialState,
    action: ActionsType
    ): InitialStateType{
switch(action.type){
    case 'SAVE_CLOTHING':
        return {
            ...state,
            clothing: [...state.clothing, ...action.clothing],
            filteredClothing: [...state.clothing, ...action.clothing],
            isLoaded: true 
        }
    case 'SET_FILTER':
        return {
            ...state,
            filteredClothing: [...action.filteredList]
        }
    case 'UNDO_FILTER':
        return {
            ...state,
            filteredClothing: [...state.clothing]
        }
    default:
        return state
}
}