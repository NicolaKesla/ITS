import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CodeVerify.css";
import GtuLogo from "../../assets/gtu-logo.png";

const CodeVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email || "";

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newCode = [...code];
    newCode[idx] = val.slice(-1);
    setCode(newCode);

    if (val && idx < inputsRef.current.length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    if (/^\d{6}$/.test(paste)) {
      const arr = paste.split("");
      setCode(arr);
      arr.forEach((_, i) => {
        if (inputsRef.current[i]) inputsRef.current[i].value = arr[i];
      });
      inputsRef.current[5].focus();
    }
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const joined = code.join("");
    if (joined.length !== 6) {
      setError("Lütfen 6 haneli kodu girin.");
      return;
    }

    try {
      setLoading(true);
      // Simüle edilen doğrulama
      await new Promise((r) => setTimeout(r, 800));
      // Burada gerçek API doğrulaması yapılır
      // Başarılı doğrulamada admin ana sayfasına yönlendir
      navigate("/adminmainpage", { state: { email, code: joined } });
    } catch (err) {
      setError("Doğrulama başarısız oldu.");
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
            <h2>Kodu Giriniz</h2>
          </div>

          <div className="login-form-container">
            <form
              onSubmit={handleSubmit}
              className="login-form"
              onPaste={handlePaste}
            >
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                {code.map((c, idx) => (
                  <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="form-input code-input"
                    ref={(el) => (inputsRef.current[idx] = el)}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                  />
                ))}
              </div>

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className={`submit-btn ${loading ? "loading" : ""}`}
              >
                {loading ? "Onaylanıyor..." : "Onayla"}
              </button>
            </form>
          </div>

          <div className="login-footer">
            <p>Mailinize gönderilen 6 haneli kodu giriniz.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeVerify;
