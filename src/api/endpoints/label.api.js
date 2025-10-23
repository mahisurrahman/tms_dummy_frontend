import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/label";
export const labelAPI = {
  createLabel: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/create`, payload),
      "Failed to Create Labels"
    ),

  getAllLabels: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/getAll`),
      "Failed to Fetch All Labels"
    ),

  updateLabels: (id, payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/update/${id}`, payload),
      "Failed to Update Labels"
    ),

  getLabelById: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/getById/${id}`),
      "Failed to Get Label By Id"
    ),

  removeLabel: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/remove/${id}`),
      "Failed to Remove Label"
    ),
};
