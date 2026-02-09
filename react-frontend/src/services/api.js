import axios from "axios";

if (!import.meta.env.VITE_API_URL) {
  throw new Error("VITE_API_URL não definida");
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
