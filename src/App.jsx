import './App.css';
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ No BrowserRouter here

import ModelForm from './components/ModelForm.jsx';
import CustomNavBar from './components/CustomNavBar.jsx';
import TableList from './components/TableList.jsx';
import HomePage from './pages/HomePage.jsx';
import axios from 'axios';

// ✅ TaskPage component for /tasks route
function TaskPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/task');
        if (Array.isArray(response.data.data)) {
          setTasks(response.data.data);
        } else {
          setError("Invalid data format received from server");
        }
      } catch (err) {
        setError("Failed to fetch tasks. Please try again later.");
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleOpen = (mode, task = null) => {
    setModalMode(mode);
    setSelectedTask(task);
    setIsOpen(true);
    setError(null);
  };

  const handleSubmit = async (newTaskData) => {
    try {
      if (modalMode === 'add') {
        const response = await axios.post('http://localhost:5000/api/task', newTaskData);
        setTasks(prevTasks => [...prevTasks, response.data.data]);
      } else {
        const response = await axios.put(
          `http://localhost:5000/api/task/${selectedTask.id}`,
          newTaskData
        );
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task.id === selectedTask.id ? response.data.data : task
          )
        );
      }
      setIsOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      console.error("Error:", err);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete task.");
      console.error("Error deleting task:", err);
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
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading tasks...</p>
        </div>
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
        onClose={() => setIsOpen(false)}
        mode={modalMode}
        taskData={selectedTask}
        error={error}
        setError={setError}
      />
    </div>
  );
}

// ✅ Main App with routing
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {/* <CustomNavBar /> */}
            <HomePage />
          </>
        }
      />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
