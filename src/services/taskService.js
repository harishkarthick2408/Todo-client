import api from "./api";

export const fetchTasks = () => api.get("/tasks").then((r) => r.data.data);

export const createTask = (payload) =>
  api.post("/tasks", payload).then((r) => r.data.data);

export const updateTask = (id, payload) =>
  api.patch(`/tasks/${id}`, payload).then((r) => r.data.data);
