import axios from "axios";

const API_URL = "http://localhost:8080/attendance";

export const checkIn = (token) => {
  return axios.post(
    `${API_URL}/check-in`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const checkOut = (token) => {
  return axios.post(
    `${API_URL}/check-out`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
