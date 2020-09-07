import { ActionsType } from './../Reducers/rootReducers';

export type CategoriesType = {
    category: string
    description: string
    clicked: boolean
}
type InitialStateType = {
    categories: Array<CategoriesType>
}
const initialState: InitialStateType = {
    categories: []
}

export default function filter(
    state: InitialStateType = initialState,
    action: ActionsType
    ): InitialStateType{
switch(action.type){
    case 'SAVE_CATEGORIES':
        return {
            ...state,
            categories: [...state.categories, ...action.categories]
        }
    case 'IS_CLICKED':
        return {
            ...state,
            categories: state.categories.map((item, i) => {
                if(i === action.i){
                    return {
                        ...item,
                        clicked: !item.clicked
                    }
                }
                return {
                    ...item,
                    clicked: false
                }
            })
        }
    default:
        return state
}
}