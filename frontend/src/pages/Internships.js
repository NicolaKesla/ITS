import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { internshipsAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './Internships.css';

const Internships = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const response = await internshipsAPI.getAll({ status: 'open' });
      setInternships(response.data);
    } catch (err) {
      setError('Failed to fetch internships');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await internshipsAPI.getAll({ search });
      setInternships(response.data);
    } catch (err) {
      setError('Failed to search internships');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (id) => {
    navigate(`/internships/${id}`);
  };

  return (
    <div className="page-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1 onClick={() => navigate('/dashboard')}>ITS</h1>
        </div>
        <div className="navbar-user">
          <span>{user?.firstName} {user?.lastName}</span>
        </div>
      </nav>

      <div className="content">
        <div className="page-header">
          <h2>Available Internships</h2>
          {user?.role === 'company' && (
            <button 
              className="btn-primary" 
              onClick={() => navigate('/create-internship')}
            >
              Post New Internship
            </button>
          )}
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search internships..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}

        <div className="internships-grid">
          {internships.map((internship) => (
            <div key={internship._id} className="internship-card">
              <h3>{internship.title}</h3>
              <p className="company-name">{internship.company?.companyName}</p>
              <p className="description">{internship.description.substring(0, 150)}...</p>
              <div className="internship-meta">
                <span>Duration: {internship.duration}</span>
                <span>Location: {internship.location}</span>
              </div>
              <button 
                className="btn-view" 
                onClick={() => handleViewDetails(internship._id)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>

        {!loading && internships.length === 0 && (
          <div className="empty-state">
            <p>No internships found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Internships;
