import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState, ActionsType } from './../../Reducers/rootReducers';
import { filteredClothingData } from './../../Selectors/selectors';
import { ClothingItemType } from './../../Reducers/mainContent';
import ContentItems from './../../Components/ContentItems/contentItems';
import { actions } from './../../Actions/actions';
import classes from './content.module.css';

type MapDispatchToPropsType = {
    changeLikeStatus: (id: string) => void
}
type MapStateToPropsType = {
    filteredClothing: Array<ClothingItemType>
}
type ContentPropsType = MapDispatchToPropsType & MapStateToPropsType

const Content: FC<ContentPropsType> = React.memo(({ filteredClothing, changeLikeStatus }) => {
    const clothing = filteredClothing.map(({ brand, color, description, price, id, liked }, i) => {
        return <ContentItems brand={brand} 
                             color={color} 
                             description={description} 
                             price={price}
                             key={id + i} 
                             id={id}
                             liked={liked}
                             changeLikeStatus={changeLikeStatus}                  
                            />
    })
    return (
        <div className={classes.container}>
            {clothing.length !== 0 ? clothing : <p className={classes.emptyCategory}>В этой категории нет товаров</p>}
        </div>
    )
})

const mapStateToProps = (state: RootState) => {
    return {
        filteredClothing: filteredClothingData(state)
    }
}
const mapDispatchToProps = (dispatch: Dispatch<ActionsType>) => {
    return {
        changeLikeStatus: (id: string) => dispatch(actions.changeLikeStatus(id))
    }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Content)
