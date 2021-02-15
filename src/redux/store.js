import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './userReducer';
import appReducer from './appReducer';


let reducers = combineReducers({

    app: appReducer,
    user: userReducer,
})


let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;