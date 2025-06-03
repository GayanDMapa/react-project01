// src/pages/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader.jsx';

import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../services/taskService';

import ModelForm from '../components/ModelForm.jsx';
import CustomNavBar from '../components/CustomNavBar.jsx';
import TableList from '../components/TableList.jsx';

import { getLoggedInUserId } from '../utils/auth'; // ✅ Import this helper

function TaskPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Get logged-in user ID from token
  const loggedInUserId = getLoggedInUserId();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetchTasks();
        if (Array.isArray(response.data.data)) {
          setTasks(response.data.data);
        } else {
          setError('Invalid data format received from server');
        }
      } catch (err) {
        setError('Failed to fetch tasks. Please try again later.');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    getTasks();
  }, []);

  const handleOpen = (mode, task = null) => {
    setModalMode(mode);
    setSelectedTask(task);
    setIsOpen(true);
    setError(null);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedTask(null);
  };

  const handleSubmit = async (newTaskData) => {
  try {
    if (modalMode === 'add') {
      const response = await addTask(newTaskData);
      setTasks(prev => [...prev, response.data.data]);
    } else {
      const response = await updateTask(selectedTask.id, newTaskData);
      setTasks(prev =>
        prev.map(task =>
          task.id === selectedTask.id ? { 
            ...task, // preserve existing properties
            ...response.data.data, // update with new data
            name: task.name // preserve the name if not returned by update
          } : task
        )
      );
    }
    closeModal();
  } catch (err) {
    const message = err.response?.data?.message || 'An error occurred. Please try again.';
    setError(message);
    console.error('Error:', err);
  }
};

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete task.';
      setError(message);
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="container-fluid p-4">
      <CustomNavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <TableList
          tasks={tasks}
          handleOpen={handleOpen}
          handleDelete={handleDelete}
          searchTerm={searchTerm}
        />
      )}

      <ModelForm
        isOpen={isOpen}
        onSubmit={handleSubmit}
        onClose={closeModal}
        mode={modalMode}
        taskData={selectedTask}
        error={error}
        setError={setError}
        loggedInUserId={loggedInUserId} // ✅ Pass userId to modal form
      />
    </div>
  );
}

export default TaskPage;
