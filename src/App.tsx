import React, { useEffect, FC, Suspense } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Route } from 'react-router-dom';
import Cart from './Containers/Cart/cart';
import Content from './Containers/Content/content';
import Filter from './Containers/Filter/filter';
import Header from './Containers/Header/header';
import Slider from './Components/Slider/slider';
import Preloder from './Components/Loading/loading';
import ItemPage from './Containers/ItemPage/itemPage';
import { isLoadedData } from './Selectors/selectors';
import { getClothing, getCategories } from './Actions/actions';
import { RootState, ActionsType } from './Reducers/rootReducers';
import './App.css';

const Profile = React.lazy(() => import('./Containers/Profile/profile'));
const Login = React.lazy(() => import('./Containers/Login/login')) 
const Liked = React.lazy(() => import('./Containers/Liked/liked'))

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
        <Suspense fallback={<Preloder />}>
          <Route path='/profile' component={Profile}/>
          <Route path='/login' component={Login}/>
          <Route path='/liked' component={Liked}/>
        </Suspense>     
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
