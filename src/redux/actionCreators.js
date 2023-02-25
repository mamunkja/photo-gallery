import axios from 'axios';
import * as actionType from './actionTypes';
import { baseUrl } from './baseUrl';

export const addComment = (galleryId, author, rating, comment) => dispatch => {
    const newComment = {
        galleryId: galleryId,
        author: author,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    }
    axios.post(baseUrl + "comments", newComment)
        .then(response => dispatch(commentAdd(response.data)))
}

export const commentAdd = comment => ({
    type: actionType.ADD_COMMENT,
    payload: comment
})

export const loadGalleries = galleries => ({
    type: actionType.LOAD_GALLERIES,
    payload: galleries
})

export const galleriesLoading = () => ({ type: actionType.GALLERIES_LOADING });

export const galleriesFailed = (errMessage) => ({
    type: actionType.GALLERIES_FAILED,
    payload: errMessage
})

export const fetchGalleries = () => dispatch => {
    dispatch(galleriesLoading());
    axios.get(baseUrl + "galleries")
        .then(response => dispatch(loadGalleries(response.data)))
        .catch(error => {
            dispatch(galleriesFailed(error.message))
        })
}

export const loadCategories = categories => ({
    type: actionType.LOAD_CATEGORIES,
    payload: categories
})

export const categoriesLoading = () => ({ type: actionType.CATEGORIES_LOADING });

export const categoriesFailed = (errMessage) => ({
    type: actionType.CATEGORIES_FAILED,
    payload: errMessage
})

export const fetchCategories = () => dispatch => {
    dispatch(categoriesLoading());
    axios.get(baseUrl + "categories")
        .then(response => dispatch(loadCategories(response.data)))
        .catch(error => {
            dispatch(galleriesFailed(error.message))
        })
}

export const loadComments = comments => ({
    type: actionType.LOAD_COMMENTS,
    payload: comments
})

export const commentsLoading = () => ({ type: actionType.COMMENTS_LOADING })

export const commentsFailed = (errMessage) => ({
    type: actionType.COMMENTS_FAILED,
    payload: errMessage
})

export const fetchComments = () => dispatch => {
    dispatch(commentsLoading());
    axios.get(baseUrl + "comments")
        .then(response => dispatch(loadComments(response.data)))
        .catch(error => {
            dispatch(commentsFailed(error.message))
        })
}

export const loadingLoggedInUser = (loggedUser) => ({
    type: actionType.LOAD_LOGGEDIN_USER,
    payload: loggedUser
})

export const loadingLoggedUserFailed = (errMessage) => ({
    type: actionType.LOGGEDIN_USER_FAILED,
    payload: errMessage
})

export const fetchLoggedInUser = () => dispatch => {
    axios.get(baseUrl + "logged")
        .then(response => {
            dispatch(loadingLoggedInUser(response.data))
        })
        .catch(error => {
            dispatch(loadingLoggedUserFailed(error.message))
        })
}

export const addToLoggedUser = (name, telNum, email, id) => dispatch => {
    const newUser = {
        name: name,
        telNum: telNum,
        email: email,
        date: new Date().getTime()
    };
    axios.post(baseUrl + "logged", newUser)
        .then(response => {
            dispatch({
                type: actionType.ADD_LOGGED_USER,
                payload: { ...newUser, id }
            })
        })
        .catch(error => {
            dispatch(loadingLoggedUserFailed(error.message))
        })
}

export const logout = (id) => dispatch => {
    axios.delete(baseUrl + "logged/" + id)
        .then(response => {
            dispatch({
                type: actionType.LOGOUT_USER
            })
        })
        .catch(error => {
            dispatch(loadingLoggedUserFailed(error.message))
        })
}