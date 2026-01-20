import axios from "axios";

const baseURL = import.meta.env.VITE_SERVER_URL;

if (!baseURL) {
  console.warn("VITE_SERVER_URL is missing! Requests will hit the frontend domain.");
}

const api = axios.create({
  baseURL: baseURL || "http://localhost:3000",
});

export default api;
