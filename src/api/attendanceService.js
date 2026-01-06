import axios from "axios";

const API_URL = "http://localhost:8080/attendance";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const checkIn = (notes = "") => {
  return axios.post(`${API_URL}/check-in`, { notes }, getAuthHeader());
};

export const checkOut = (notes = "") => {
  return axios.post(`${API_URL}/check-out`, { notes }, getAuthHeader());
};

export const getTodayAttendance = () => {
  return axios.get(`${API_URL}/today`, getAuthHeader());
};

export const getAttendanceHistory = (days = 30) => {
  return axios.get(`${API_URL}/history?days=${days}`, getAuthHeader());
};
