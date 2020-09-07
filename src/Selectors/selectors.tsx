import { RootState } from './../Reducers/rootReducers';

export const clothingData = (state: RootState) => {
    return state.mainContent.clothing
}
export const isLoadedData = (state: RootState) => {
    return state.mainContent.isLoaded
}
export const categoryData = (state: RootState) => {
    return state.filter.categories
}
export const filteredClothingData = (state: RootState) => {
    return state.mainContent.filteredClothing
}
export const inCartData = (state: RootState) => {
    return state.cart.inCart
}