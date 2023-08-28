import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL;
export const axiosInstance = axios.create({
  baseURL: baseURL,
});
