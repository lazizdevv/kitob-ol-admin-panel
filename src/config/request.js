import axios from "axios";
import { loadState } from "./stroge";

const API_URL_AUTH = import.meta.env.VITE_API_URL_AUTH;

const request = axios.create({ baseURL: API_URL_AUTH });

request.interceptors.request.use((config) => {
  const token = loadState("user")?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export { request };
