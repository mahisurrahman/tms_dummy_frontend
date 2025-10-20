import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/notification";
export const notificationAPI = {
  getByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/getByTask`, payload),
      "Failed to fetch Notification with task ID and UserId"
    ),
};
