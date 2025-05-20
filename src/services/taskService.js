// src/services/taskService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/task';

export const fetchTasks = () => {
  return axios.get(API_URL);
};

export const addTask = (taskData) => {
  return axios.post(API_URL, taskData);
};

export const updateTask = (taskId, taskData) => {
  return axios.put(`${API_URL}/${taskId}`, taskData);
};

export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`);
};
