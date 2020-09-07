import React, { FC, useState } from 'react';
import { connect } from 'react-redux';
import { compose, Dispatch } from 'redux';
import { NavLink } from 'react-router-dom';
import { withRouter, RouteComponentProps } from "react-router";
import { Button } from 'antd';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { RootState, ActionsType } from './../../Reducers/rootReducers';
import { clothingData } from './../../Selectors/selectors';
import { ClothingItemType } from './../../Reducers/mainContent';
import { actions } from './../../Actions/actions';
import classes from './itemPage.module.css';

type ItemPageParams = {
    id: string
}
type TransportPageRouterProps = RouteComponentProps<ItemPageParams>
type MapDispatchPropsType = {
    addToCart: (description: string, 
                price: number, 
                currentColor: string, 
                currentSize: string) => void
}
type MapStatePropsType = {
    clothing: Array<ClothingItemType>
}
type ItemPagePropsType = MapStatePropsType & TransportPageRouterProps & MapDispatchPropsType

const ItemPage: FC<ItemPagePropsType> = ({ match, clothing, addToCart }) => {
    const [currentColor, setColor] = useState('grey')
    const [currentSize, setSize] = useState('m')
    const itemInfo = clothing.map(({ id, description, brand, price, color, size }, i) => {
        if(id === match.params.id){
            const colorPicker = color.map((item, i) => {
                return <div key={item + i} 
                            style={{background: `${item}`}} 
                            className={classes.colorSquare}
                            id={item}
                            onClick={() => setColor(item)}
                        ></div>
            })
            const sizePicker = size.map((item) => {
                return (
                    <div className={classes.size}
                         id={item}
                         key={item + i}
                         onClick={() => setSize(item)}
                    >
                        {item}
                    </div>
                )
            })
            return (
                <div className={classes.container} key={id + i}>
                    <img src={require(`./../../Images/male.jpg`)} alt={description}/>
                    <div className={classes.descriptionBlock}>
                        <div className={classes.descriptionBlockItem}>Бренд: {brand}</div>
                        <div className={classes.descriptionBlockItem}>Описание: {description}</div>
                        <div className={classes.colorSquareContainer}>Выберите цвет: {colorPicker}</div>
                        <div className={classes.sizePickerBlock}>Выберите размер: {sizePicker}</div>
                        <div className={classes.descriptionBlockItem}>Цена: {price}</div>
                        <div className={classes.descriptionBlockItem}>
                            <NavLink to='/cart'>
                                <Button className={classes.addToCartBtn}
                                        size='large' 
                                        onClick={() => addToCart(description, price, currentColor, currentSize)}>
                                            <ShoppingCartOutlinedIcon/>
                                            Добавить в корзину
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )
        }
    })
    return (
        <div className={classes.container}>
            {itemInfo}
        </div>
    )
}

const mapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        clothing: clothingData(state)
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        addToCart: (description: string, 
                    price: number, 
                    currentColor: string, 
                    currentSize: string) => dispatch(actions.addToCart(description, price, currentColor, currentSize))
    }
} 

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ItemPage) as FC
