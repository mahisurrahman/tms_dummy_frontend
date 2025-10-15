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

  startTask: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/start/${id}`),
      "Failed to Start Tasks"
    ),

  pauseTask: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/pause/${id}`),
      "Failed to Pause Tasks "
    ),

  resumeTask: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/resume/${id}`),
      "Failed to Resume Tasks "
    ),

  getTaskLogFilter: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/filterTasks/all`, payload),
      "FAiled to fetch all the task log filters. "
    ),

  getTaskLogById: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/srcById/${id}`),
      "FAiled to fetch the task log by id. "
    ),

  updateTaskStatus: (params, payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/updateStatus/${params}`, payload),
      "Failed to Update task status"
    ),
};
