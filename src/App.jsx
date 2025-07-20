import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import TaskPage from './pages/TaskPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import SelectionPage from './pages/SelectionPage.jsx';
import MyTaskPage from './pages/MyTaskPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';

function App() {
  return (
    // No <Router> here
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      - <Route path="/verify-email" element={<VerifyEmailPage />} />
      + <Route path="/verify-email/:token" element={<VerifyEmailPage />} />


      {/* <Route path="/verify-email" element={<VerifyEmailPage />} /> */}

      {/* Task related routes */}
      <Route path="/tasks" element={<TaskPage />} />
      <Route path="/old-tasks" element={<TaskPage />} />

      {/* After login selection page */}
      <Route path="/selection" element={<SelectionPage />} />

       {/* After selection MyTaskPage page */}
     {/* <Route path="/myTasks" element={<MyTaskPage />} /> */}
     <Route path="/my-tasks" element={<MyTaskPage />} />


      {/* Add more routes here if needed */}
    </Routes>
  );
}

export default App;
