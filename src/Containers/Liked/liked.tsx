import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from './../../Reducers/rootReducers';
import { filteredClothingData } from './../../Selectors/selectors';
import { ClothingItemType } from './../../Reducers/mainContent';
import LikedItems from './../../Components/LikedItems/likedItems';
import classes from './liked.module.css';

type MapStateToPropsType = {
    filteredClothingData: Array<ClothingItemType>
}
type LikedPropsType = MapStateToPropsType
const Liked: FC<LikedPropsType> = ({ filteredClothingData }) => {
    const likedItems = filteredClothingData.map(({ brand, color, description, price, id, liked }, i) => {
        if(liked){
            return <LikedItems brand={brand} 
                               color={color} 
                               description={description} 
                               price={price}
                               key={id + i} 
                               id={id}                
                        />
        }
        return null
    })
    return (
        <div className={classes.container}>
            {likedItems.length !== 0 ? likedItems : <p className={classes.emptyCategory}>В этой категории нет товаров</p>}
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        filteredClothingData: filteredClothingData(state)
    }
}
export default connect(mapStateToProps)(Liked)