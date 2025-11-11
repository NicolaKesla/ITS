import React, { useState } from "react";
import "./MemberAssignment.css";

const departments = [
  "Bilgisayar Mühendisliği",
  "Biyomühendislik",
  "Çevre Mühendisliği",
  "Elektronik Mühendisliği",
  "Endüstri Mühendisliği",
  "Endüstriyel Tasarım",
  "Fizik",
  "Harita Mühendisliği",
  "İktisat",
];

const MemberAssignment = () => {
  const [step, setStep] = useState(1);
  const [selectedDept, setSelectedDept] = useState("");
  const [showDeptList, setShowDeptList] = useState(false);
  const [position, setPosition] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [singlePass, setSinglePass] = useState("");
  const [saved, setSaved] = useState(false);

  const handleDeptSelect = (d) => {
    setSelectedDept(d);
    setStep(2);
    setShowDeptList(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate save
    setSaved(true);
    setStep(4);
  };

  const resetForm = () => {
    setStep(1);
    setSaved(false);
    setSelectedDept("");
    setPosition("");
    setShowDetails(false);
    setName("");
    setEmail("");
    setSinglePass("");
  };

  return (
    <div className="member-page">
      <h2>Üye Atama Sayfası</h2>

      {step === 1 && (
        <div className="step-1">
          <div className="dept-header">
            <label>Bölüm Seçiniz</label>
            <div className="dept-actions">
              <button
                className="small-btn"
                aria-expanded={showDeptList}
                onClick={() => setShowDeptList((s) => !s)}
              >
                {showDeptList ? "▾" : "▸"}
              </button>
            </div>
          </div>

          {showDeptList && (
            <div className="dept-list">
              {departments.map((d) => (
                <div
                  key={d}
                  className="dept-item"
                  onClick={() => handleDeptSelect(d)}
                >
                  {d}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="step-2">
          <div className="form-row">
            <input value={selectedDept} readOnly className="form-input" />
          </div>

          <div className="form-row">
            <select
              value={position}
              onChange={(e) => {
                setPosition(e.target.value);
                if (e.target.value) setShowDetails(true);
              }}
              className="form-input"
            >
              <option value="">Pozisyon Seçiniz</option>
              <option value="komisyon-baskani">Komisyon Başkanı</option>
              <option value="komisyon-uyesi">Komisyon Üyesi</option>
            </select>
          </div>

          {showDetails && (
            <div className="inline-details">
              <form onSubmit={handleSave} className="assignment-form">
                <div className="form-group">
                  <label>İsim Giriniz</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Mail Giriniz</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tek Kullanımlık Şifre Giriniz</label>
                  <input
                    value={singlePass}
                    onChange={(e) => setSinglePass(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>

                <div className="actions-row">
                  <button type="submit" className="primary-btn">
                    Kaydet
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Modal popup for success */}
      {saved && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={resetForm}
              aria-label="kapat"
            >
              ✕
            </button>
            <div className="modal-body">
              <div className="success-message">Kayıt Oluşturuldu</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberAssignment;
