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

// Task endpoint
const TASKS_ENDPOINT = '/tasks';

// Get all tasks (with optional params)
export const getTasks = async (params = {}) => {
  try {
    const res = await api.get(TASKS_ENDPOINT, { params });
    return res.data.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Add a new task
export const addTask = async (task) => {
  try {
    const res = await api.post(TASKS_ENDPOINT, task);
    return res.data.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  try {
    const res = await api.put(`${TASKS_ENDPOINT}/${id}`, updatedTask);
    return res.data.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    const res = await api.delete(`${TASKS_ENDPOINT}/${id}`);
    return res.data.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

// Verify email endpoint
export const verifyEmail = async (token) => {
  try {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api;
