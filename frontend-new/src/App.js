import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Auth/Login';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ChairDashboard from './pages/Chair/ChairDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/chair-dashboard" element={<ChairDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
