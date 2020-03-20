import { combineReducers } from 'redux';
import rentalReducer from './rental-reducer';

const rootReducer = combineReducers({
  rental: rentalReducer
});

export default rootReducer;