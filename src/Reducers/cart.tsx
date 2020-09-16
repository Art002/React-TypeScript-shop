import { ActionsType } from './../Reducers/rootReducers';

export type InCartType = {
    description: string
    price: number
    count: number
    currentColor: string
    currentSize: string
    sum: number
    id: string
}
type InitialStateType = {
    inCart: Array<InCartType>
}
const initialState: InitialStateType = { 
    inCart: []
}

export default function orderData(
    state: InitialStateType = initialState,
    action: ActionsType
    ){
switch(action.type){
    case 'ADD_TO_CART': 
        return {
            inCart: [...state.inCart, {
                description: action.description,
                price: action.price,
                currentColor: action.currentColor,
                currentSize: action.currentSize,
                count: action.count,
                sum: action.sum,
                id: action.id
            }]
        }
    case 'QUANTITY_CHANGE':
        return {
            inCart: state.inCart.map((item, i) => {
                if(i === action.i){
                    return {
                        ...item,
                        count: action.count,
                        sum: action.sum
                    }
                }
                return item
            })
        }
    case 'REMOVE_FROM_CART':
        return {
            inCart: state.inCart.filter((item) => item.id !== action.id)
        }
    default:
        return state
}
}