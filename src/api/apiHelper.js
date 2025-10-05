// src/api/apiHelpers.js
export const handleRequest = async (promise, errorMessage) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    const msg = error.response?.data?.message || errorMessage;
    throw new Error(msg);
  }
};
