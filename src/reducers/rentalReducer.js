import { FETCH_RENTALS, FETCH_RENTALS_BY_ID } from "../actions/types";

const initialState = {
  rentals: [],
  rental: {}
};

const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return { ...state, rentals: action.payload };
    case FETCH_RENTALS_BY_ID:
      return { ...state, rental: action.payload };
    default:
      return state;
  }
};

export default rentalReducer;
