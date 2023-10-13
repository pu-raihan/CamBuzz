import axios from "axios";

export const makeRequest = axios.create({
  // baseURL: "https://cambuzz-api.onrender.com/api",
  baseURL: "https://cambuzz.cyclic.app/api",
  withCredentials: true,
});
