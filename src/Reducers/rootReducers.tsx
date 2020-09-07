import { combineReducers } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import mainContent from './mainContent';
import filter from './filter';
import cart from './cart';
import { actions } from './../Actions/actions';

export type ThunkActionType<U extends Action<any>> = ThunkAction<Promise<void>, RootState, unknown, U>
export type InferPropsType<T> = T extends {[key: string]: infer U} ? U : never
export type ActionsType = ReturnType<InferPropsType<typeof actions>>

const rootReducer = combineReducers({
    mainContent,
    filter,
    cart  
  })

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer