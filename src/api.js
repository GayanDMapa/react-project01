import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks'; // Update if different

// Get all tasks
export const getTasks = async () => {
    const res = await axios.get(API_URL);
    return res.data.data; // return only the "data" field
};

// Add a new task
export const addTask = async (task) => {
    const res = await axios.post(API_URL, task);
    return res.data.data;
};

// Update a task
export const updateTask = async (id, updatedTask) => {
    const res = await axios.put(`${API_URL}/${id}`, updatedTask);
    return res.data.data;
};

// Delete a task
export const deleteTask = async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data.data;
};
