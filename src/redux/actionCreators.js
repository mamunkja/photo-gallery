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
        .then(response => response.data)
        .then(comment => dispatch(commentAdd(comment)))
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
        .then(response => response.data)
        .then(galleries => dispatch(loadGalleries(galleries)))
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
        .then(response => response.data)
        .then(categories => dispatch(loadCategories(categories)))
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
        .then(response => response.data)
        .then(comments => dispatch(loadComments(comments)))
        .catch(error => {
            dispatch(commentsFailed(error.message))
        })
}

export const loadingLoggedInUser = (loggedUsers) => ({
    type: actionType.LOAD_LOGGEDIN_USER,
    payload: loggedUsers
})

export const loadingLoggedUserFailed = (errMessage) => ({
    type: actionType.LOGGEDIN_USER_FAILED,
    payload: errMessage
})

export const fetchLoggedInUser = () => dispatch => {
    axios.get(baseUrl + "logged")
        .then(response => response.data)
        .then(loggedUsers => dispatch(loadingLoggedInUser(loggedUsers)))
        .catch(error => {
            dispatch(loadingLoggedUserFailed(error.message))
        })
}

export const addToLoggedUser = (name, telNum, email) => dispatch => {
    const newUser = {
        name: name,
        telNum: telNum,
        email: email,
        date: new Date().getTime()
    };
    axios.post(baseUrl + "logged", newUser)
        .then(response => response.data)
        .then(user => {
            dispatch({
                type: actionType.ADD_LOGGED_USER,
                payload: user
            })
        })

        .catch(error => {
            dispatch(loadingLoggedUserFailed(error.message))
        })
}