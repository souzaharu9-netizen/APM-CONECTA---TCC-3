import axios, { type AxiosInstance } from "axios";

// Environment variable for API base URL (Vite only exposes VITE_* variables to the browser).
// Fallback to localhost:8080 for development if VITE_API_URL is not set.
const API_URL: string =
  import.meta.env.VITE_API_URL || "http://localhost:8080";

const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiCep: AxiosInstance = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: {
    "Content-Type": "application/json",
  },
});

interface HttpCommon {
  instance: AxiosInstance;
  apiCep: AxiosInstance;
}

const httpCommon: HttpCommon = {
  instance,
  apiCep,
};

export default httpCommon;
