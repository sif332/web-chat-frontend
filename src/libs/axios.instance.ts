import axios from "axios";

const baseURL =
  process.env.REACT_APP_BASEURL ?? "https://webchat-backend.xaiphersk.com";
  
export const axiosInstance = axios.create({
  baseURL: baseURL,
});
