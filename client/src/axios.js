import axios from "axios";

export const makeRequest = axios.create({
  // baseURL: "https://cambuzz-api.onrender.com/api",
  baseURL: `${process.env.REACT_APP_SERVER_ADD}/api`,
  withCredentials: true,
});
