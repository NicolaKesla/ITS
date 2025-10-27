import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>ITS - Internship Tracking System</h1>
        </div>
        <div className="navbar-user">
          <span>Welcome, {user?.firstName} {user?.lastName}</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Dashboard</h2>
          <p>Role: <strong>{user?.role}</strong></p>
        </div>

        <div className="dashboard-cards">
          {user?.role === 'student' && (
            <>
              <div className="card" onClick={() => handleNavigate('/internships')}>
                <h3>Browse Internships</h3>
                <p>Find and apply to available internship opportunities</p>
              </div>
              <div className="card" onClick={() => handleNavigate('/my-applications')}>
                <h3>My Applications</h3>
                <p>View and manage your internship applications</p>
              </div>
            </>
          )}

          {user?.role === 'company' && (
            <>
              <div className="card" onClick={() => handleNavigate('/internships')}>
                <h3>View Internships</h3>
                <p>View all internship postings</p>
              </div>
              <div className="card" onClick={() => handleNavigate('/create-internship')}>
                <h3>Post Internship</h3>
                <p>Create a new internship opportunity</p>
              </div>
              <div className="card" onClick={() => handleNavigate('/applications')}>
                <h3>Applications</h3>
                <p>Review student applications</p>
              </div>
            </>
          )}

          {user?.role === 'admin' && (
            <>
              <div className="card" onClick={() => handleNavigate('/internships')}>
                <h3>All Internships</h3>
                <p>Manage all internship postings</p>
              </div>
              <div className="card" onClick={() => handleNavigate('/applications')}>
                <h3>All Applications</h3>
                <p>View and evaluate all applications</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
