// src/api/endpoints/users.api.js

import apiClient from "../apiClient";
import { handleRequest } from "../apiHelper";

const baseMiddlePoint = "/user";

export const userAPI = {
  loginUser: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/auth/login`, payload),
      "Failed to Login"
    ),

  getAll: () =>
    handleRequest(
      apiClient.get(`${baseMiddlePoint}/getAllUsers`),
      "Failed to fetch users"
    ),

  getUserInfo: (token) =>
    handleRequest(
      apiClient.get("/user/getUserInfo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      "Failed to fetch user info"
    ),

  create: (payload) =>
    handleRequest(
      apiClient.post(`${baseMiddlePoint}/register`, payload),
      "Failed to create user"
    ),
};
