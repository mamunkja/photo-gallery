import { combineReducers } from "redux";
import * as actionType from "./actionTypes";
import { InitialCommentForm, InitialLoginForm, InitialSignupForm } from "./forms";
import { createForms } from "react-redux-form";

const galleryReducer = (galleryState = { isLoading: false, galleries: [], errMess: null }, action) => {
    switch (action.type) {
        case actionType.GALLERIES_LOADING:
            return {
                ...galleryState,
                isLoading: true,
                errMess: null,
                galleries: []
            }
        case actionType.LOAD_GALLERIES:
            return {
                ...galleryState,
                isLoading: false,
                errMess: null,
                galleries: action.payload
            }
        case actionType.GALLERIES_FAILED:
            return {
                ...galleryState,
                isLoading: false,
                errMess: action.payload,
                galleries: []
            }
        default:
            return galleryState;
    }
}

const categoryReducer = (categoryState = { isLoading: false, categories: [], errMess: null }, action) => {
    switch (action.type) {
        case actionType.CATEGORIES_LOADING:
            return {
                ...categoryState,
                isLoading: true,
                errMess: null,
                categories: []
            }
        case actionType.LOAD_CATEGORIES:
            return {
                ...categoryState,
                isLoading: false,
                errMess: null,
                categories: action.payload
            }
        case actionType.CATEGORIES_FAILED:
            return {
                ...categoryState,
                isLoading: false,
                errMess: action.payload,
                categories: []
            }
        default:
            return categoryState;
    }
}

const commentReducer = (commentState = { isLoading: true, comments: [] }, action) => {
    switch (action.type) {
        case actionType.LOAD_COMMENTS:
            return {
                ...commentState,
                isLoading: false,
                comments: action.payload
            };
        case actionType.COMMENTS_LOADING:
            return {
                ...commentState,
                isLoading: true,
                comments: []
            }
        case actionType.ADD_COMMENT:
            return {
                ...commentState,
                comments: commentState.comments.concat(action.payload)
            }
        default:
            return commentState;
    }
}

const loggedUserReducer = (loggedUserState = [], action) => {
    switch (action.type) {
        case actionType.LOAD_LOGGEDIN_USER:
            return {
                ...loggedUserState,
                loggedUsers: action.payload
            };
        case actionType.ADD_LOGGED_USER:
            return {
                ...loggedUserState,
                loggedUsers: action.payload
            };
        case actionType.LOGGEDIN_USER_FAILED:
            return {
                ...loggedUserState,
                errMess: action.payload,
                loggedUsers: []
            }
        default:
            return loggedUserState;
    }
}

const Reducer = combineReducers({
    galleries: galleryReducer,
    comments: commentReducer,
    categories: categoryReducer,
    loggedUsers: loggedUserReducer,
    ...createForms({
        signup: InitialSignupForm
    }),
    ...createForms({
        login: InitialLoginForm
    }),
    ...createForms({
        commentForm: InitialCommentForm
    })
})

export default Reducer;