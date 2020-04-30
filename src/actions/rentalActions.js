import axios from "axios";
import { FETCH_RENTALS, FETCH_RENTALS_BY_ID, FETCH_RENTALS_BY_ID_INIT, FETCH_RENTALS_INIT, FETCH_RENTALS_FAIL } from "./types";
import axiosService from "../services/axiosService";

const axiosInstance = axiosService.getInstance();

export const fetchRentals = city => dispatch => {
  const url = city ? `/rentals?city=${city}` : "/rentals";
  
  dispatch({
    type: FETCH_RENTALS_INIT
  });

  axiosInstance
    .get(url)
    .then((response) => {
      return response.data;
    })
    .then((rentals) => {
      dispatch({
        type: FETCH_RENTALS,
        payload: rentals,
      });
    })
    .catch(error => {
      dispatch({
        type: FETCH_RENTALS_FAIL,
        payload: error.response.data.errors
      });
    })
};

export const fetchRentalById = (rentalId) => dispatch => {
  dispatch({
    type: FETCH_RENTALS_BY_ID_INIT,
    payload: {},
  });

  axios
    .get(`/api/v1/rentals/${rentalId}`)
    .then((response) => {
      return response.data;
    })
    .then((rental) => {
      dispatch({
        type: FETCH_RENTALS_BY_ID,
        payload: rental,
      });
    });
};

export const createRental = (rentalData) => {
  return axiosInstance.post("/rentals", rentalData)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data.errors))
};

