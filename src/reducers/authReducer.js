import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/types";

const initialState = {
  isAuth: false,
  errors: [],
  username: ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true, username: action.payload };
    case LOGIN_FAILURE:
      return { ...state, errors: action.payload };
    case LOGOUT:
      return { ...state, isAuth: false }
    default:
      return state;
  }
};

export default authReducer;
