import axiosService from "../services/axiosService";

const axiosInstance = axiosService.getInstance();

export const createBooking = booking => {
  return axiosInstance.post('/bookings', booking)
    .then(response => response.data)
    .catch(error => Promise.reject(error.response.data.errors))
}