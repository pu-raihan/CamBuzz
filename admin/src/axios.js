import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "https://cambuzz.onrender.com/api",
  withCredentials: true,
});
