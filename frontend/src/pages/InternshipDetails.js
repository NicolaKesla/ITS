import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { internshipsAPI, applicationsAPI } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';
import './InternshipDetails.css';

const InternshipDetails = () => {
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const response = await internshipsAPI.getById(id);
        setInternship(response.data);
      } catch (err) {
        setError('Failed to fetch internship details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchInternship();
  }, [id]);

  const handleApply = async () => {
    try {
      setApplying(true);
      await applicationsAPI.create({
        internship: id,
        coverLetter
      });
      setApplicationSuccess(true);
      setCoverLetter('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error && !internship) return <div className="error">{error}</div>;
  if (!internship) return <div className="error">Internship not found</div>;

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
        <button className="btn-back" onClick={() => navigate('/internships')}>
          ← Back to Internships
        </button>

        <div className="details-card">
          <h1>{internship.title}</h1>
          <h3 className="company">{internship.company?.companyName}</h3>
          
          <div className="details-section">
            <h4>Description</h4>
            <p>{internship.description}</p>
          </div>

          <div className="details-section">
            <h4>Requirements</h4>
            <ul>
              {internship.requirements?.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <strong>Duration:</strong>
              <span>{internship.duration}</span>
            </div>
            <div className="detail-item">
              <strong>Location:</strong>
              <span>{internship.location}</span>
            </div>
            <div className="detail-item">
              <strong>Start Date:</strong>
              <span>{new Date(internship.startDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <strong>End Date:</strong>
              <span>{new Date(internship.endDate).toLocaleDateString()}</span>
            </div>
            <div className="detail-item">
              <strong>Positions:</strong>
              <span>{internship.positions}</span>
            </div>
            {internship.stipend && (
              <div className="detail-item">
                <strong>Stipend:</strong>
                <span>${internship.stipend}</span>
              </div>
            )}
          </div>

          {user?.role === 'student' && !applicationSuccess && (
            <div className="apply-section">
              <h4>Apply for this Internship</h4>
              <textarea
                placeholder="Write a cover letter..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows="6"
              />
              <button 
                className="btn-apply" 
                onClick={handleApply}
                disabled={applying}
              >
                {applying ? 'Applying...' : 'Submit Application'}
              </button>
            </div>
          )}

          {applicationSuccess && (
            <div className="success-message">
              Application submitted successfully!
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default InternshipDetails;
