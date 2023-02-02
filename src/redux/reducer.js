import { combineReducers } from "redux";
import * as actionType from "./actionTypes";
import { InitialContactForm } from "./forms";
import { createForms } from "react-redux-form";

const dishReducer = (dishState = { isLoading: false, dishes: [], errMess: null }, action) => {
    switch (action.type) {
        case actionType.DISHES_LOADING:
            return {
                ...dishState,
                isLoading: true,
                errMess: null,
                dishes: []
            }
        case actionType.LOAD_DISHES:
            return {
                ...dishState,
                isLoading: false,
                errMess: null,
                dishes: action.payload
            }
        case actionType.DISHES_FAILED:
            return {
                ...dishState,
                isLoading: false,
                errMess: action.payload,
                dishes: []
            }
        default:
            return dishState;
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
            let comment = action.payload;
            return {
                ...commentState,
                comments: commentState.comments.concat(comment)
            }
        default:
            return commentState;
    }
}

const Reducer = combineReducers({
    dishes: dishReducer,
    comments: commentReducer,
    ...createForms({
        feedback: InitialContactForm
    })
})

export default Reducer;