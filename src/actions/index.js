import axios from "axios";
import { FETCH_RENTALS, FETCH_RENTALS_BY_ID, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from "./types";
import authService from "../services/authService";
import axiosService from "../services/axiosService";

const axiosInstance = axiosService.getInstance();

export const fetchRentals = () => {
  return (dispatch) => {
    axiosInstance
      .get("/rentals")
      .then((response) => {
        return response.data;
      })
      .then((rentals) => {
        dispatch({
          type: FETCH_RENTALS,
          payload: rentals,
        });
      });
  };
};

export const fetchRentalById = (rentalId) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_RENTALS_BY_ID,
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
};

// auth actions
export const register = (userData) => {
  return axios.post("/api/v1/users/register", userData)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err.response.data.errors))
};

export const checkAuthState = () => dispatch => {
  if (authService.isAuthenticated()) {
    dispatch({
      type: LOGIN_SUCCESS
    })
  }
}

export const login = (userData) => dispatch => {
  return axios.post("/api/v1/users/login", userData)
    .then(response => {
      const token = response.data;
      authService.saveToken(token)
      dispatch({
        type: LOGIN_SUCCESS
      })
    })
    .catch(err =>{
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.response.data.errors
      })
    })
}

export const logout = () => {
  authService.clearToken();
  return {
    type: LOGOUT
  }
}