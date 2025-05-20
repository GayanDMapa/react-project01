import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/tasks" element={<TaskPage />} />
    </Routes>
  );
}

export default App;
