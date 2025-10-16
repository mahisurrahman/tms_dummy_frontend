import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/comments";
export const commentsApi = {
  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/create`, payload),
      "Failed to create Comment"
    ),

  getAllCommentByTaskId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/getByTaskId/${id}`),
      "Failed to Fetch all the Comments by Task ID"
    ),

  removeComment: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/remove/${id}`),
      "Failed to Remove Comments"
    ),
};
