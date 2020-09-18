import React, { useEffect, FC } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Route } from 'react-router-dom';
import Cart from './Containers/Cart/cart';
import Content from './Containers/Content/content';
import Filter from './Containers/Filter/filter';
import Header from './Containers/Header/header';
import Profile from './Containers/Profile/profile';
import Slider from './Components/Slider/slider';
import Preloder from './Components/Loading/loading';
import ItemPage from './Containers/ItemPage/itemPage';
import Login from './Containers/Login/login';
import { isLoadedData } from './Selectors/selectors';
import { getClothing, getCategories } from './Actions/actions';
import { RootState, ActionsType } from './Reducers/rootReducers';
import './App.css';


type MapDispatchToPropsType = {
  getClothing: () => Promise<void>,
  getCategories: () => Promise<void>
}
type MapStateToPropsType = {
  isLoaded: boolean
}
type AppPropsType = MapDispatchToPropsType & MapStateToPropsType

const App: FC<AppPropsType> = ({getClothing, getCategories, isLoaded}) => {
  useEffect(() => {
    getClothing()
  }, [])
  useEffect(() => {
    getCategories()
  }, [])
  
  return (
    !isLoaded 
    ? <Preloder /> 
    : <div className="App">
        <Route path='*' component={Header}/>
        <Route exact path='/' component={Slider}/>
        <Route exact path='/' component={Filter}/>
        <Route exact path='/' component={Content}/>
        <Route exact path='/:id' component={ItemPage}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/login' component={Login}/>     
      </div> 
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoaded: isLoadedData(state)
  }
} 
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActionsType>) => {
  return {
    getClothing: () => dispatch(getClothing()),
    getCategories: () => dispatch(getCategories())
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(App)
