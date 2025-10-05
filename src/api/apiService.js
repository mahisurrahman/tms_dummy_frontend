import axiosInstance from "./axiosInstance";

const apiService = {
  getData: async (endpoint, params = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, { params });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch data");
    }
  },

  postData: async (endpoint, data) => {
    try {
      const response = await axiosInstance.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to post data");
    }
  },
};

export default apiService;
