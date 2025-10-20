import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/notifyControll";
export const notiFyCntrlAPI = {
  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/create`, payload),
      "Failed to create Tasks"
    ),

  getByTaskId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/byTask/${id}`),
      "Failed to fetch Notification Controll with task ID"
    ),
};
