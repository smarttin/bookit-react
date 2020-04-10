import axios from "axios";
import { FETCH_RENTALS, FETCH_RENTALS_BY_ID } from "./types";

export const fetchRentals = () => {
  return dispatch => {
    axios
      .get("/api/v1/rentals")
      .then(response => {
        return response.data;
      })
      .then(rentals => {
        dispatch({
          type: FETCH_RENTALS,
          payload: rentals
        });
      });
  };
};

export const fetchRentalById = rentalId => {
  return dispatch => {
    dispatch({
      type: FETCH_RENTALS_BY_ID,
      payload: {}
    });

    axios
      .get(`/api/v1/rentals/${rentalId}`)
      .then(response => {
        return response.data;
      })
      .then(rental => {
        dispatch({
          type: FETCH_RENTALS_BY_ID,
          payload: rental
        });
      });
  };
};
