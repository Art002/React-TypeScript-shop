import React, { FC } from 'react';
import { connect } from 'react-redux';
import { RootState } from './../../Reducers/rootReducers';
import { filteredClothingData } from './../../Selectors/selectors';
import { ClothingItemType } from './../../Reducers/mainContent';
import ContentItems from './../../Components/ContentItems/contentItems';
import classes from './content.module.css';

type MapDispatchToPropsType = {
    
}
type MapStateToPropsType = {
    filteredClothing: Array<ClothingItemType>
}
type ContentPropsType = MapDispatchToPropsType & MapStateToPropsType

const Content: FC<ContentPropsType> = ({ filteredClothing }) => {
    const clothing = filteredClothing.map(({ brand, color, description, price, id }, i) => {
        return <ContentItems brand={brand} 
                             color={color} 
                             description={description} 
                             price={price}
                             key={id + i} 
                             id={id}                  
                            />
    })
    return (
        <div className={classes.container}>
            {clothing.length !== 0 ? clothing : <p className={classes.emptyCategory}>В этой категории нет товаров</p>}
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        filteredClothing: filteredClothingData(state)
    }
}

export default connect(mapStateToProps)(Content)
