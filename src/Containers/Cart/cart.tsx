import React, { FC } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { InputNumber, Button  } from 'antd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { RootState, ActionsType } from './../../Reducers/rootReducers';
import { inCartData } from './../../Selectors/selectors';
import { InCartType } from './../../Reducers/cart';
import { actions, saveUsersOrder } from './../../Actions/actions';
import classes from './cart.module.css'; 

type MapStatePropsType = {
    inCartData: Array<InCartType>
}
type MapDispatchPropsType = {
    countChangeHandler: (val: number|string|undefined, i: number, price: number) => void
    removeFromCart: (id: string) => void
    saveUsersOrder: () => void
}
type CartPropsType = MapStatePropsType & MapDispatchPropsType
const Cart: FC<CartPropsType> = ({ inCartData, countChangeHandler, removeFromCart, saveUsersOrder }) => {
    const totalArray: Array<number> = []
    const cartData = inCartData.map(({ description, price, currentColor, currentSize, sum, count, id }, i) => {
        totalArray.push(sum) 
        return (
            <div className={classes.orderItem} key={description + i}>
                <div className={classes.imgBlock}>
                    <img src={require(`./../../Images/male.jpg`)} alt={description}/>
                    <div className={classes.imgBlockInfo}>
                        <div className={classes.imgBlockInfoName}>
                            {description}
                            <br/>
                            <div className={classes.colorBlock}>Цвет: {currentColor}</div>
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
                <div className={classes.delete}>
                    <HighlightOffIcon onClick={() => removeFromCart(id)} className={classes.deleteIcon}/>
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
                    <Button type="default" 
                            size='large' 
                            className={classes.confirmButton}
                            onClick={saveUsersOrder}>
                                Заказать
                    </Button>
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
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActionsType>) => {
    return {
        countChangeHandler: (val: number|string|undefined, i: number, price: number) => dispatch(actions.countChangeHandler(val, i, price)),
        removeFromCart: (id: string) => dispatch(actions.removeFromCart(id)),
        saveUsersOrder: () => dispatch(saveUsersOrder())
    }
} 
export default connect(MapStateToProps, mapDispatchToProps)(Cart)