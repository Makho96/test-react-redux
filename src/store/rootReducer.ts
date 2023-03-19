import {combineReducers} from 'redux';
import counterReducer from './TestData/index';
import productsReducer from './Products/index'
const rootReducer = combineReducers({
  counter: counterReducer,
  products: productsReducer
});

export default rootReducer