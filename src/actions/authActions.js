import axios from "axios";
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types";
import authService from "../services/authService";

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
