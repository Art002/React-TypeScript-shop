import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { InputNumber } from 'antd';
import { RootState, ActionsType } from './../../Reducers/rootReducers';
import { inCartData } from './../../Selectors/selectors';
import { InCartType } from './../../Reducers/cart';
import { actions } from './../../Actions/actions';
import classes from './cart.module.css'; 

type MapStatePropsType = {
    inCartData: Array<InCartType>
}
type MapDispatchPropsType = {
    countChangeHandler: (val: number|string|undefined, i: number, price: number) => void
}
type CartPropsType = MapStatePropsType & MapDispatchPropsType
const Cart: FC<CartPropsType> = ({ inCartData, countChangeHandler }) => {
    const totalArray: Array<number> = []
    const cartData = inCartData.map(({ description, price, currentColor, currentSize, sum, count }, i) => {
        totalArray.push(sum) 
        return (
            <div className={classes.orderItem} key={description + i}>
                <div className={classes.imgBlock}>
                    <img src={require(`./../../Images/male.jpg`)} alt={description}/>
                    <div className={classes.imgBlockInfo}>
                        <div className={classes.imgBlockInfoName}>
                            {description}
                        </div>
                        <div className={classes.imgBlockInfoPrice}>
                            Цена: {price}
                        </div>
                    </div>
                </div>
                <div className={classes.countBlock}>
                    <InputNumber min={1} 
                                 max={15} 
                                 defaultValue={1}
                                 value={count} 
                                 onChange={(val: number|string|undefined) => countChangeHandler(val, i, price)} 
                                 />
                </div>
                <div className={classes.sumBlock}>
                    <span>{sum}</span>
                </div>
            </div>
       ) 
    })
    const total = totalArray.reduce((prev, curr) => (prev + curr), 0)
    return (
        <div className={classes.container}>
            {inCartData.length !== 0 
            ? 
            <>
                <div className={classes.cart}>
                    {cartData}
                </div>
                <div className={classes.total}>
                    Итого:<br/>
                    {total} грн.
                </div>
            </>
            :<div className={classes.empty}>Корзина пустая</div>}
                            
        </div>     
    )
}

const MapStateToProps = (state: RootState): MapStatePropsType => {
    return {
        inCartData: inCartData(state)
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        countChangeHandler: (val: number|string|undefined, i: number, price: number) => dispatch(actions.countChangeHandler(val, i, price))
    }
} 
export default connect(MapStateToProps, mapDispatchToProps)(Cart)