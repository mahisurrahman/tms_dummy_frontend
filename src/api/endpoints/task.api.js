import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/task";
export const taskAPI = {
  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/create`, payload),
      "Failed to create Tasks"
    ),
};
