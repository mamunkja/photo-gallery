import DISHES from '../data/dishes';
import * as actionType from './actionTypes';

export const addComment = (dishId, author, rating, comment) => ({
    type: actionType.ADD_COMMENT,
    payload: {
        dishId: dishId,
        author: author,
        rating: rating,
        comment: comment
    }
})

export const loadDishes = dishes => ({
    type: actionType.LOAD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({ type: actionType.DISHES_LOADING })

export const fetchDishes = () => dispatch => {
    dispatch(dishesLoading());
    setTimeout(() => dispatch(loadDishes(DISHES)), 3000);
}