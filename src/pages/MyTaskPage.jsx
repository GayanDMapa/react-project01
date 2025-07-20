// src/pages/TaskPage.jsx
import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader.jsx';
import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from '../services/MyTaskService.js'; // ✅ Use your MyTaskService.js
import ModelForm from '../components/ModelForm.jsx';
import CustomNavBar from '../components/CustomNavBar.jsx';
import TableList from '../components/TableList.jsx';
import { getLoggedInUserId, getLoggedInUser } from '../utils/auth.jsx'; // ✅ Import this helper

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
    const user = getLoggedInUser();
    console.log(user?.id); // now you can use user.id in fetch calls

//   useEffect(() => {
//     const loadTasks = async () => {
//       try {
//         const res = await fetchTasks();
//         setTasks(res.data);
//       } catch (err) {
//         setError('Failed to fetch tasks.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadTasks();
//   }, []);

useEffect(() => {
  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      const tasksArray = Array.isArray(response.data) ? response.data : response.data.data;
      setTasks(tasksArray);
    } catch (err) {
      setError('Failed to fetch tasks.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  loadTasks();
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

  const handleSubmit = async (formData) => {
  try {
    const taskToSend = {
      ...formData,
      user_id: loggedInUserId, // ✅ include the user_id
    };

    if (modalMode === 'add') {
      const res = await addTask(taskToSend);
      setTasks((prev) => [...prev, res.data]);
    } else {
      const res = await updateTask(selectedTask.id, formData);
      setTasks((prev) =>
        prev.map((t) => (t.id === selectedTask.id ? res.data : t))
      );
    }

    closeModal();
  } catch (err) {
    setError(err.response?.data?.message || 'An error occurred');
    console.error('Submit Error:', err);
  }
};


  const handleDelete = async (id) => {
  if (!id) {
    console.error('Task id is undefined!');
    return;
  }
  try {
    await deleteTask(id);
    loadTasks();
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};

  return (
    <div className="container mt-4">
      <CustomNavBar onOpen={() => handleOpen('add')} onSearch={setSearchTerm} />

      {error && (
        <div className="alert alert-danger">{error}</div>
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
        onClose={closeModal}
        onSubmit={handleSubmit}
        mode={modalMode}
        taskData={selectedTask}
        error={error}
        setError={setError}
      />
    </div>
  );
}

export default TaskPage;
