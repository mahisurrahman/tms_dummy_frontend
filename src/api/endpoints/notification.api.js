import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/notification";
export const notificationAPI = {
  getByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/getByTask`, payload),
      "Failed to fetch Notification with task ID and UserId"
    ),

  getNotificationsByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/user/${id}`),
      "Failed to fetch Notification with UserId"
    ),

  readByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/read/byTask`, payload),
      "Failed to read Notification with task ID and UserId"
    ),

  readCommentByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/comment/read/byTask`, payload),
      "Failed to read Comment Notification with task ID and UserId"
    ),

  getCommentNotificationByTaskIdAndUserId: (payload) =>
    handleRequest(
      apiClient.post(
        `${baseMiddlePoint}/comment/getByTaskIdAndUserId`,
        payload
      ),
      "Failed to fetch Comment Notification with task ID and UserId"
    ),
};
