import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/notification";
export const notificationAPI = {
  getByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/getByTask`, payload),
      "Failed to fetch Notification with task ID and UserId"
    ),

    readByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/read/byTask`, payload),
      "Failed to read Notification with task ID and UserId"
    ),
};
