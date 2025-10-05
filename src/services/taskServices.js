import apiClient from "../api/apiClient";

export const getTasks = async () => {
  const res = await apiClient.get("/tasks");
  return res.data;
};

export const createTask = async (data) => {
  const res = await apiClient.post("/tasks", data);
  return res.data;
};
