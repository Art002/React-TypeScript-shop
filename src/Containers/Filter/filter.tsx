import React, { FC, useMemo } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { categoryReselector } from './../../Selectors/selectors';
import { RootState, ActionsType } from './../../Reducers/rootReducers';
import FilterItems from './../../Components/FilterItems/filterItems';
import { CategoriesType } from './../../Reducers/filter';
import { filterCategories } from './../../Actions/actions';
import classes from './filter.module.css';

type MapDispatchToPropsType = {
  filterCategories: (category: string, i: number) => Promise<void>
}
type MapStateToPropsType = {
  categories: Array<CategoriesType>
}
type FilterPropsType = MapDispatchToPropsType & MapStateToPropsType

const Filter: FC<FilterPropsType> = ({ categories, filterCategories }) => {
    const categoryItem = useMemo(() => {
      return categories.map(({ category, description, clicked }, i) => {
        return <FilterItems category={category}
                            description={description} 
                            key={category}
                            i={i}
                            filterCategories={filterCategories}
                            clicked={clicked}
                            />
      })
    }, [categories])
    return (
        <div className={classes.container}>
            {categoryItem}
        </div>
    )
}

  const mapStateToProps = (state: RootState) => {
    return {
      categories: categoryReselector(state)
    }
  }

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, ActionsType>) => {
  return {
    filterCategories: (category: string, i: number) => dispatch(filterCategories(category, i))
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(Filter) 