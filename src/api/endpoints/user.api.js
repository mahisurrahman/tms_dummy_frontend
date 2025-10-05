// src/api/endpoints/users.api.js

import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/user";

export const userAPI = {
  getAll: () =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/getAllUsers`),
      "Failed to fetch users"
    ),

  // getById: (id) =>
  //   handleRequest(
  //     apiClient.get(`${baseMiddlePoint}/${id}`),
  //     "Failed to fetch user"
  //   ),

  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/register`, payload),
      "Failed to create user"
    ),

  // update: (id, data) =>
  //   handleRequest(apiClient.put(`/user/${id}`, data), "Failed to update user"),

  // delete: (id) =>
  //   handleRequest(apiClient.delete(`/user/${id}`), "Failed to delete user"),
};
