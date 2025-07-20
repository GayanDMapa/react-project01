// src/services/taskService.jsx
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks'; // Plural 'tasks' (matches backend)

// Helper function to get the auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: { Authorization: `Bearer ${token}` }
  };
};

// Fetch all tasks (GET /api/tasks)
export const fetchTasks = () => {
  return axios.get(API_URL, getAuthHeader());
};

// Add a new task (POST /api/tasks)
export const addTask = (taskData) => {
  return axios.post(API_URL, taskData, getAuthHeader());
};

// Update a task (PUT /api/tasks/:id)
export const updateTask = (taskId, taskData) => {
  return axios.put(`${API_URL}/${taskId}`, taskData, getAuthHeader());
};

// Delete a task (DELETE /api/tasks/:id)
export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`, getAuthHeader());
};

// Fetch only the logged-in user's tasks (GET /api/mytasks)
export const fetchMyTasks = () => {
  return axios.get('http://localhost:5000/api/mytasks', getAuthHeader());
};