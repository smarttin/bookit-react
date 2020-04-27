import { combineReducers } from 'redux';
import rentalReducer from './rentalReducer';
import authReducer from './authReducer.js';
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  rental: rentalReducer,
  form: formReducer,
  auth: authReducer
});

export default rootReducer;