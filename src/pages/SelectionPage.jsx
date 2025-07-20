import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar.jsx';
import "./SelectionPage.css";

export default function SelectionPage() {
  const navigate = useNavigate();

  const handleMyTask = () => {
    // Add your navigation logic for My Task
    console.log('My Task clicked');
  };

  return (
    <div className="selection-page">
      <NavBar />
      <div className="selection-overlay">
        <div className="selection-content">
          <div className="welcome-section">
            <h1 className="page-title">Choose Your Path</h1>
            <p className="page-subtitle">Select an option to get started with your tasks</p>
          </div>
          
           <div className="selection-container">
            <div className="task-card task-card-1">
              <Link to="/myTasks" className="card-link">
                <div className="card-overlay"></div>
                <div className="card-content">
                  <div className="card-icon">📋</div>
                  <h3 className="card-title">My Task</h3>
                  <p className="card-description">Create and manage your personal tasks</p>
                  <button className="task-button">Get Started</button>
                </div>
              </Link>
            </div>
            
            <div className="task-card task-card-2">
              <Link to="/tasks" className="card-link">
                <div className="card-overlay"></div>
                <div className="card-content">
                  <div className="card-icon">📚</div>
                  <h3 className="card-title">Old Task</h3>
                  <p className="card-description">View and continue previous tasks</p>
                  <button className="task-button">Continue</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}