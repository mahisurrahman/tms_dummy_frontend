import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/timeline";
export const timelineApi = {
  getAllTimeLine: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/srcById/${id}`),
      "Failed to Fetch all the Tasks"
    ),
};
