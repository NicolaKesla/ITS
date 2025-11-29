import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommissionChairAssignment.css';

const CommissionChairAssignment = () => {
    const [departments, setDepartments] = useState([]);
    const [currentChair, setCurrentChair] = useState(null);
    const [formData, setFormData] = useState({
        departmentId: '',
        firstName: '',
        lastName: '',
        email: '',
        temporaryPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/departments');
            setDepartments(response.data);
        } catch (err) {
            console.error('Error fetching departments:', err);
            setError('Bölümler yüklenirken bir hata oluştu.');
        }
    };

    const fetchCurrentChair = async (departmentId) => {
        if (!departmentId) {
            setCurrentChair(null);
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:3001/api/department-chair/${departmentId}`);
            setCurrentChair(response.data);
            
            // Show warning if there's already a chair
            if (response.data) {
                setShowWarning(true);
            } else {
                setShowWarning(false);
            }
        } catch (err) {
            console.error('Error fetching current chair:', err);
            setCurrentChair(null);
            setShowWarning(false);
        }
    };

    const handleDepartmentChange = (e) => {
        const deptId = e.target.value;
        setFormData({
            ...formData,
            departmentId: deptId
        });
        setError('');
        setSuccess('');
        fetchCurrentChair(deptId);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleRemoveChair = async () => {
        if (!currentChair || !formData.departmentId) return;

        if (!window.confirm('Bu komisyon başkanını kaldırmak istediğinizden emin misiniz?')) {
            return;
        }

        setLoading(true);
        try {
            await axios.delete(`http://localhost:3001/api/remove-commission-chair/${currentChair.id}`);
            setSuccess('Komisyon başkanı başarıyla kaldırıldı.');
            setCurrentChair(null);
            setShowWarning(false);
        } catch (err) {
            console.error('Error removing chair:', err);
            setError(err.response?.data?.error || 'Başkan kaldırılırken bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Confirm replacement if there's an existing chair
        if (showWarning && currentChair) {
            const confirmReplace = window.confirm(
                `${currentChair.name} adlı kullanıcı zaten bu bölümün başkanı. Yeni başkan atandığında mevcut başkan kaldırılacak. Devam etmek istiyor musunuz?`
            );
            if (!confirmReplace) {
                setLoading(false);
                return;
            }
        }

        try {
            await axios.post('http://localhost:3001/api/create-commission-chair', {
                departmentId: parseInt(formData.departmentId),
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                temporaryPassword: formData.temporaryPassword
            });

            setSuccess('Komisyon başkanı başarıyla atandı!');
            setFormData({ departmentId: formData.departmentId, firstName: '', lastName: '', email: '', temporaryPassword: '' });
            
            // Refresh current chair
            fetchCurrentChair(formData.departmentId);
        } catch (err) {
            console.error('Error assigning chair:', err);
            setError(err.response?.data?.error || 'Atama sırasında bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const selectedDepartment = departments.find(d => d.id === parseInt(formData.departmentId));

    return (
        <div>
            <h2>Komisyon Başkanı Atama</h2>
            <p>Yeni komisyon başkanlarını atayın veya mevcut başkanları yönetin.</p>

            <div className="content-layout">
                {/* Left Side - Form */}
                <div className="form-container-card">
                    <h3>Yeni Başkan Ekleme Formu</h3>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form className="formatted-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="departmentId">Bölüm Seçiniz:</label>
                            <select
                                id="departmentId"
                                name="departmentId"
                                value={formData.departmentId}
                                onChange={handleDepartmentChange}
                                required
                                disabled={loading}
                            >
                                <option value="">Bölüm seçiniz...</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">İsim:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Örn: Habil"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Soyisim:</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Örn: Kalkan"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-posta:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Örn: habil@gtu.edu.tr"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="temporaryPassword">Geçici Şifre:</label>
                            <input
                                type="password"
                                id="temporaryPassword"
                                name="temporaryPassword"
                                placeholder="Geçici şifre belirleyin"
                                value={formData.temporaryPassword}
                                onChange={handleChange}
                                required
                                disabled={loading}
                            />
                        </div>

                        {showWarning && currentChair && (
                            <div className="error-message" style={{ marginBottom: '20px' }}>
                                <strong>Uyarı:</strong> Bu bölümde zaten bir başkan mevcut. Yeni başkan atandığında mevcut başkan kaldırılacaktır.
                            </div>
                        )}

                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading}
                        >
                            <i className="fa-solid fa-user-plus"></i>
                            {loading ? ' Kaydediliyor...' : ' Başkanı Kaydet'}
                        </button>
                    </form>
                </div>

                {/* Right Side - Current Chair */}
                <div className="table-container-card">
                    <h3>Mevcut Komisyon {selectedDepartment ? `(${selectedDepartment.name})` : ''}</h3>
                    <p>Her bölümde sadece 1 Başkan bulunabilir.</p>

                    {!formData.departmentId ? (
                        <div className="info-bar">
                            <i className="fa-solid fa-circle-info"></i>
                            Lütfen önce bir bölüm seçiniz.
                        </div>
                    ) : currentChair ? (
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>İsim Soyisim</th>
                                    <th>E-posta</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{currentChair.name}</td>
                                    <td>{currentChair.email}</td>
                                    <td>
                                        <button 
                                            className="btn-sil" 
                                            onClick={handleRemoveChair}
                                            disabled={loading}
                                        >
                                            <i className="fa-solid fa-trash"></i> Sil
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <div className="info-bar">
                            <i className="fa-solid fa-circle-info"></i>
                            Bu bölümde henüz komisyon başkanı atanmamış.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommissionChairAssignment;
