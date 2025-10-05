// src/api/interceptors.js
export const setupInterceptors = (api) => {
  // REQUEST interceptor → attach auth token
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  // RESPONSE interceptor → handle global errors
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      if (!response) {
        console.error("Network error or timeout");
        return Promise.reject(new Error("Network error"));
      }

      const status = response.status;

      if (status === 401) {
        console.error("Unauthorized - Redirecting to login...");
        // window.location.href = "/login"; // if applicable
      } else if (status === 500) {
        console.error("Internal Server Error");
      }

      return Promise.reject(error);
    }
  );
};
