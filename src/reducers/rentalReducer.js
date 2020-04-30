import { FETCH_RENTALS, FETCH_RENTALS_BY_ID_INIT, FETCH_RENTALS_BY_ID, FETCH_RENTALS_INIT, FETCH_RENTALS_FAIL } from "../actions/types";

const initialState = {
  rentals: [],
  rental: {},
  errors: []
};

const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTALS_INIT:
      return { ...state, rentals: [], errors: []}
    case FETCH_RENTALS:
      return { ...state, rentals: action.payload };
    case FETCH_RENTALS_BY_ID_INIT:
      return { ...state, rental: {} }
    case FETCH_RENTALS_BY_ID:
      return { ...state, rental: action.payload };
    case FETCH_RENTALS_FAIL:
      return { ...state, errors: action.payload }
    default:
      return state;
  }
};

export default rentalReducer;
