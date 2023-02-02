import axios from 'axios';
import * as actionType from './actionTypes';
import { baseUrl } from './baseUrl';

export const addComment = (dishId, author, rating, comment) => dispatch => {
    const newComment = {
        dishId: dishId,
        author: author,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    }
    axios.post(baseUrl + "comments", newComment)
        .then(response => response.data)
        .then(comment => dispatch(commentAdd(comment)))
}

export const commentAdd = comment => ({
    type: actionType.ADD_COMMENT,
    payload: comment
})

export const loadDishes = dishes => ({
    type: actionType.LOAD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({ type: actionType.DISHES_LOADING });

export const dishesFailed = (errMessage) => ({
    type: actionType.DISHES_FAILED,
    payload: errMessage
})

export const fetchDishes = () => dispatch => {
    dispatch(dishesLoading());
    axios.get(baseUrl + "dishes")
        .then(response => response.data)
        .then(dishes => dispatch(loadDishes(dishes)))
        .catch(error => {
            dispatch(dishesFailed(error.message))
        })
}

export const loadComments = comments => ({
    type: actionType.LOAD_COMMENTS,
    payload: comments
})

export const commentsLoading = () => ({ type: actionType.COMMENTS_LOADING })

export const fetchComments = () => dispatch => {
    dispatch(commentsLoading());
    axios.get(baseUrl + "comments")
        .then(response => response.data)
        .then(comments => dispatch(loadComments(comments)))
}