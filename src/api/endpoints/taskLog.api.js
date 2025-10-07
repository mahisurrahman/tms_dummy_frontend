import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/taskLog";
export const taskLogAPI = {
  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/create`, payload),
      "Failed to create Task Log"
    ),

  getAllTask: () =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/get/all`),
      "Failed to Fetch all the Tasks log"
    ),

  getTaskLogFilter: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/filterTasks/all`, payload),
      "FAiled to fetch all the task log filters. "
    ),
};
