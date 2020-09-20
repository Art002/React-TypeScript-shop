import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState, ActionsType } from './../../Reducers/rootReducers';
import { actions } from './../../Actions/actions';
import Logo from './../../Components/Logo/logo';
import Search from './../../Components/Search/search';
import IconsBlock from './../../Components/HeaderIconsBlock/headerIconsBlock';
import { inCartData, filteredClothingData } from './../../Selectors/selectors';
import { InCartType } from './../../Reducers/cart';
import { ClothingItemType } from './../../Reducers/mainContent';
import classes from './header.module.css';

type MapStatePropsType = {
    inCartData: Array<InCartType>
    filteredClothingData: Array<ClothingItemType>
}
type MapDispatchPropsType = {
    searchHandler: (e: any) => void
}
type HeaderPropsType = MapStatePropsType & MapDispatchPropsType
const Header: FC<HeaderPropsType> = ({ searchHandler, inCartData, filteredClothingData }) => {
    const likesCount = filteredClothingData.filter(item => item.liked)
    const inStorage = localStorage.getItem('id')
    //const isLoggedIn = inStorage ? '/profile' : '/login'
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <Logo />
                <Search searchHandler={searchHandler}/>
                <IconsBlock inCartLength={inCartData.length} 
                            likesCountLength={likesCount.length} 
                            inStorage={inStorage}/>
            </div>
        <hr className={classes.borderBottom}/>
        </div>
    )
}
const MapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        inCartData: inCartData(state),
        filteredClothingData: filteredClothingData(state)
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        searchHandler: (e: any) => dispatch(actions.searchHandler(e))
    }
} 

export default connect(MapStateToProps, mapDispatchToProps)(Header)