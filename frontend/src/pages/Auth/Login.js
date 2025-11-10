import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import GtuLogo from "../../assets/gtu-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // API çağrısı simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Demo amaçlı - gerçek uygulamada API çağrısı yapılacak
      if (formData.email && formData.password) {
        // Başarılı girişte admin ana sayfasına yönlendir
        navigate("/adminmainpage", { state: { email: formData.email } });
      } else {
        throw new Error("Geçersiz bilgiler");
      }

      setLoading(false);
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // yönlendir: email giriş sayfasına
    navigate("/forgotPassword");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Header */}
        <div className="login-header">
          <div className="logo-container">
            <img
              src={GtuLogo}
              alt="Gebze Teknik Üniversitesi Logosu"
              className="gtu-logo"
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="login-content">
          {/* Title */}
          <div className="system-title">
            <h2>STAJ TAKİP SİSTEMİ</h2>
          </div>

          {/* Login Form */}
          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="ornek@gtu.edu.tr"
                />
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Şifre
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>

              {/* Forgot Password */}
              <div className="forgot-password-container">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="forgot-password-btn"
                >
                  Şifremi unuttum
                </button>
              </div>

              {/* Error Message */}
              {error && <div className="error-message">{error}</div>}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`submit-btn ${loading ? "loading" : ""}`}
              >
                {loading ? (
                  <span className="loading-content">
                    <span className="spinner"></span>
                    Giriş yapılıyor...
                  </span>
                ) : (
                  "Giriş"
                )}
              </button>
            </form>
          </div>

          {/* Footer Info */}
          <div className="login-footer">
            <p>Sorun yaşıyorsanız sistem yöneticisi ile iletişime geçin.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
