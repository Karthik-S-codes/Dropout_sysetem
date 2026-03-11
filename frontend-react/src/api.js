import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // Node backend
});

export default api;
