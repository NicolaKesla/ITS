import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailEntry.css";
import GtuLogo from "../../assets/gtu-logo.png";

const EmailEntry = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simülasyon: API çağrısı yapıp e-postaya kod gönderilir
      await new Promise((res) => setTimeout(res, 800));

      if (!email) throw new Error("Lütfen e-posta giriniz");

      // Başarılıysa kod doğrulama sayfasına yönlendir
      navigate("/verificationCode", { state: { email } });
    } catch (err) {
      setError(err.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <img src={GtuLogo} alt="GTU" className="gtu-logo" />
          </div>
        </div>

        <div className="login-content">
          <div className="system-title">
            <h2>Mailinizi giriniz</h2>
          </div>

          <div className="login-form-container">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Mailinizi giriniz
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  placeholder="ornek@gtu.edu.tr"
                />
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className={`submit-btn ${loading ? "loading" : ""}`}
              >
                {loading ? "Gönderiliyor..." : "Kodu Gönder"}
              </button>
            </form>
          </div>

          <div className="login-footer">
            <p>Mail adresinize gelen kodu girerek devam edebilirsiniz.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailEntry;
