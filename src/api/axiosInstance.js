import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Add auth if needed: 'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor (e.g., add auth token dynamically)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: Add token from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling
    if (error.response) {
      console.error("API Error:", error.response.data);
      // Example: If 401, redirect to login
      if (error.response.status === 401) {
        window.location.href = "/login";
      }
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
