import api from "../../services/axios";

export const registerApi = (data) =>
  api.post("/auth/register", data);

export const loginApi = (data) =>
  api.post("/auth/login", data);

export const logoutApi = () =>
  api.post("/auth/logout");
