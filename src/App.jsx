import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SelectionPage from './pages/SelectionPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/old-tasks" element={<TaskPage />} /> {/* ✅ Route for Old Tasks */}
      <Route path="/tasks" element={<TaskPage />}/>
      <Route path="/login" element={<LoginPage />} />{/* ✅ Enable this route */}
      <Route path="/selection" element={<SelectionPage />} />
      <Route path="/signup" element={<SignupPage />} /> 
      <Route path="/tasks" element={<TaskPage />} /> 
    </Routes>
  );
}

export default App;
