import axios from "axios";

export const checkIn = async (token) => {
  return axios.post(
    "http://localhost:8080/attendance/check-in",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
