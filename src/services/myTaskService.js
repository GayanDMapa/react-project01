import axios from 'axios';
const API_URL = 'http://localhost:5000/api/mytasks';

const getToken = () => localStorage.getItem('token');

// ✅ Get all tasks (for logged-in user)
export const fetchTasks = () => {
  return axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

// ✅ Add task
export const addTask = (task) => {
  return axios.post(API_URL, task, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

// ✅ Update task
export const updateTask = (taskId, task) => {
  return axios.put(`${API_URL}/${taskId}`, task, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};

// ✅ Delete task
export const deleteTask = (taskId) => {
  return axios.delete(`${API_URL}/${taskId}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
};
