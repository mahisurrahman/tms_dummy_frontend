import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/task";
export const taskAPI = {
  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/create`, payload),
      "Failed to create Tasks"
    ),

  update: (id, payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/upt/${id}`, payload),
      "Failed to Update Tasks"
    ),

  remove: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/remove/${id}`),
      "Failed to Remove Tasks"
    ),

  getAllTask: () =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/get/all`),
      "Failed to Fetch all the Tasks"
    ),

  getAllTaskByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/total/task/${id}`),
      "Failed to Fetch all the Tasks"
    ),

  getAllCompletedTaskByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/total/completed/${id}`),
      "Failed to Fetch all the Tasks"
    ),

  getAllOnGoingTaskByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/total/ongoing/${id}`),
      "Failed to Fetch all the Tasks"
    ),

  getAllPendingTaskByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/total/pending/${id}`),
      "Failed to Fetch all the Tasks"
    ),

  getAllInQueTaskByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/total/inque/${id}`),
      "Failed to Fetch all the Tasks"
    ),

  getAllReviewTaskByUserId: (id) =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/total/review/${id}`),
      "Failed to Fetch all the Tasks"
    ),
};
