// src/api/apiClient.js
import axios from "axios";
import { setupInterceptors } from "./interceptors";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach interceptors (for auth, error handling, etc.)
// setupInterceptors(apiClient);

export default apiClient;
