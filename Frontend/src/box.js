import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};
const middleware = [thunk]
const box = createbox(rootReducer, initialState, applyMiddleware(...middleware))

export default box;