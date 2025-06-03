import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // base URL for all requests
});

// Add token to request headers if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const TASKS_ENDPOINT = '/tasks'; // endpoint for tasks

// Get all tasks
export const getTasks = async () => {
  const res = await api.get(TASKS_ENDPOINT);
  return res.data.data;
};

// Add a new task
export const addTask = async (task) => {
  const res = await api.post(TASKS_ENDPOINT, task);
  return res.data.data;
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  const res = await api.put(`${TASKS_ENDPOINT}/${id}`, updatedTask);
  return res.data.data;
};

// Delete a task
export const deleteTask = async (id) => {
  const res = await api.delete(`${TASKS_ENDPOINT}/${id}`);
  return res.data.data;
};

// *** Add this to export the axios instance as default ***
export default api;
