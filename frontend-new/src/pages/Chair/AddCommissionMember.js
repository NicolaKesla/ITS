import React, { useState, useEffect } from 'react';
import './AddCommissionMember.css';

const AddCommissionMember = () => {
    const [currentMembers, setCurrentMembers] = useState([
        { id: 1, name: 'Mehmet Kaya', email: 'mehmet.kaya@example.com' },
        { id: 2, name: 'Ayşe Demir', email: 'ayse.demir@example.com' }
    ]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        temporaryPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleRemoveMember = (memberId) => {
        if (!window.confirm('Bu komisyon üyesini kaldırmak istediğinizden emin misiniz?')) {
            return;
        }

        // Frontend only - remove from state
        setCurrentMembers(currentMembers.filter(m => m.id !== memberId));
        setSuccess('Komisyon üyesi başarıyla kaldırıldı.');
        setTimeout(() => setSuccess(''), 3000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        // Frontend only - simulate adding member
        setTimeout(() => {
            const newMember = {
                id: Date.now(),
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email
            };
            
            setCurrentMembers([...currentMembers, newMember]);
            setSuccess('Komisyon üyesi başarıyla atandı!');
            setFormData({ firstName: '', lastName: '', email: '', temporaryPassword: '' });
            setLoading(false);
        }, 500);
    };

    return (
        <div>
            <h2>Komisyon Üyesi Ekleme</h2>
            <p>Yeni komisyon üyelerini atayın veya mevcut üyeleri yönetin.</p>

            <div className="content-layout">
                {/* Left Side - Form */}
                <div className="form-container-card">
                    <h3>Yeni Üye Ekleme Formu</h3>

                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    <form className="formatted-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">İsim:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Örn: Ali"
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
                                placeholder="Örn: Yılmaz"
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
                                placeholder="Örn: ali.yilmaz@gtu.edu.tr"
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

                        <button 
                            type="submit" 
                            className="btn-submit"
                            disabled={loading}
                        >
                            <i className="fa-solid fa-user-plus"></i>
                            {loading ? ' Kaydediliyor...' : ' Üyeyi Kaydet'}
                        </button>
                    </form>
                </div>

                {/* Right Side - Current Members */}
                <div className="table-container-card">
                    <h3>Mevcut Komisyon Üyeleri</h3>
                    <p>Her bölümde en fazla 2 üye bulunabilir.</p>

                    {currentMembers.length === 0 ? (
                        <div className="info-bar">
                            <i className="fa-solid fa-circle-info"></i>
                            Bu bölümde henüz komisyon üyesi atanmamış.
                        </div>
                    ) : (
                        <table className="styled-table">
                            <thead>
                                <tr>
                                    <th>İsim Soyisim</th>
                                    <th>E-posta</th>
                                    <th>İşlem</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentMembers.map(member => (
                                    <tr key={member.id}>
                                        <td>{member.name}</td>
                                        <td>{member.email}</td>
                                        <td>
                                            <button 
                                                className="btn-sil" 
                                                onClick={() => handleRemoveMember(member.id)}
                                                disabled={loading}
                                            >
                                                <i className="fa-solid fa-trash"></i> Sil
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {currentMembers.length >= 2 && (
                        <div className="warning-message" style={{ marginTop: '15px' }}>
                            <i className="fa-solid fa-exclamation-triangle"></i>
                            Maksimum üye sayısına ulaşıldı. Yeni üye eklemek için mevcut bir üyeyi kaldırın.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddCommissionMember;
