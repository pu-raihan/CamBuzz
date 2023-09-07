import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://cambuzz-api.onrender.com/api",
  withCredentials: true,
});
