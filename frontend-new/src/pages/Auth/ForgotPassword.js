import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import authService from '../../services/authService';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Enter email, 2: Enter new password
    const [formData, setFormData] = useState({
        email: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        if (error) setError('');
        if (success) setSuccess('');
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setError('');
        
        if (!formData.email) {
            setError('E-posta adresi giriniz');
            return;
        }
        
        // Move to next step
        setStep(2);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate passwords match
        if (formData.newPassword !== formData.confirmPassword) {
            setError('Şifreler eşleşmiyor');
            setLoading(false);
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Şifre en az 6 karakter olmalıdır');
            setLoading(false);
            return;
        }

        try {
            await authService.resetPassword(formData.email, formData.newPassword);
            setSuccess('Şifreniz başarıyla değiştirildi! Giriş sayfasına yönlendiriliyorsunuz...');
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            console.error('Password reset error:', err);
            setError(err.error || 'Şifre sıfırlama sırasında bir hata oluştu');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/');
    };

    return (
        <>
            <Header />
            <div className="forgot-password-container">
                <div className="forgot-password-box">
                    <h2>Şifremi Unuttum</h2>
                    
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    
                    {step === 1 ? (
                        <>
                            <p className="reset-info">
                                Sisteme kayıtlı e-posta adresinizi girin. Yeni şifrenizi belirleyebileceksiniz.
                            </p>
                            <form onSubmit={handleEmailSubmit}>
                                <div className="input-group">
                                    <label htmlFor="email">E-posta</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="E-posta adresinizi giriniz"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-primary">
                                    Devam Et
                                </button>
                                <div className="back-to-login">
                                    <a href="#!" onClick={handleBackToLogin}>Giriş Ekranına Dön</a>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <p className="reset-info">
                                <strong>{formData.email}</strong> için yeni şifrenizi belirleyin.
                            </p>
                            <form onSubmit={handlePasswordSubmit}>
                                <div className="input-group">
                                    <label htmlFor="newPassword">Yeni Şifre</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="Yeni şifrenizi giriniz"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Yeni şifrenizi tekrar giriniz"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        disabled={loading}
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn-primary"
                                    disabled={loading}
                                >
                                    {loading ? 'Kaydediliyor...' : 'Şifreyi Değiştir'}
                                </button>
                                <div className="back-to-login">
                                    <a href="#!" onClick={() => setStep(1)}>Geri Dön</a>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;
