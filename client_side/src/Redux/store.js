
import { Action } from "./action";
import reducer from "./Reducer";
import {legacy_createStore, combineReducers, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"

const rootReducer = combineReducers({
    auth : reducer
})

const createComposer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose

export const store = legacy_createStore(rootReducer, createComposer(applyMiddleware(thunk)))