import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProfile.css";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    ad: "Habil",
    soyad: "Kalkan",
    mail: "admin@gtu.edu.tr",
    pozisyon: "Komisyon Başkanı",
    telefon: "0555 000 0000",
  });

  const [editing, setEditing] = useState("");
  const [temp, setTemp] = useState("");

  const startEdit = (key) => {
    setEditing(key);
    setTemp(profile[key]);
  };

  const saveEdit = (key) => {
    setProfile((p) => ({ ...p, [key]: temp }));
    setEditing("");
  };

  const cancelEdit = () => {
    setEditing("");
  };
  const navigate = useNavigate();
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwdErrors, setPwdErrors] = useState("");
  const [pwdChanged, setPwdChanged] = useState(false);

  return (
    <div className="admin-profile">
      <h2>Profilim</h2>

      <div className="profile-row">
        <div className="profile-left">
          <strong>Ad:</strong>
          <div className="profile-value">
            {editing === "ad" ? (
              <input
                autoFocus
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(editing);
                  if (e.key === "Escape") cancelEdit();
                }}
              />
            ) : (
              profile.ad || ""
            )}
          </div>
        </div>
        <div className="profile-actions">
          {editing === "ad" ? (
            <>
              <button className="save-btn" onClick={() => saveEdit("ad")}>
                Kaydet
              </button>
              <button className="cancel-btn" onClick={cancelEdit}>
                Vazgeç
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => startEdit("ad")}>
              Düzenle
            </button>
          )}
        </div>
      </div>

      <div className="profile-row">
        <div className="profile-left">
          <strong>Soyad:</strong>
          <div className="profile-value">
            {editing === "soyad" ? (
              <input
                autoFocus
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(editing);
                  if (e.key === "Escape") cancelEdit();
                }}
              />
            ) : (
              profile.soyad || ""
            )}
          </div>
        </div>
        <div className="profile-actions">
          {editing === "soyad" ? (
            <>
              <button className="save-btn" onClick={() => saveEdit("soyad")}>
                Kaydet
              </button>
              <button className="cancel-btn" onClick={cancelEdit}>
                Vazgeç
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => startEdit("soyad")}>
              Düzenle
            </button>
          )}
        </div>
      </div>

      <div className="profile-row">
        <div className="profile-left">
          <strong>Mail:</strong>
          <div className="profile-value">
            {editing === "mail" ? (
              <input
                autoFocus
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(editing);
                  if (e.key === "Escape") cancelEdit();
                }}
              />
            ) : (
              profile.mail
            )}
          </div>
        </div>
        <div className="profile-actions">
          {editing === "mail" ? (
            <>
              <button className="save-btn" onClick={() => saveEdit("mail")}>
                Kaydet
              </button>
              <button className="cancel-btn" onClick={cancelEdit}>
                Vazgeç
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => startEdit("mail")}>
              Düzenle
            </button>
          )}
        </div>
      </div>

      <div className="profile-row">
        <div className="profile-left">
          <strong>Pozisyon:</strong>
          <div className="profile-value">{profile.pozisyon}</div>
        </div>
        <div className="profile-actions">
          <div style={{ width: 120 }} />
        </div>
      </div>

      <div className="profile-row">
        <div className="profile-left">
          <strong>Telefon Numarası:</strong>
          <div className="profile-value">
            {editing === "telefon" ? (
              <input
                autoFocus
                value={temp}
                onChange={(e) => setTemp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(editing);
                  if (e.key === "Escape") cancelEdit();
                }}
              />
            ) : (
              profile.telefon
            )}
          </div>
        </div>
        <div className="profile-actions">
          {editing === "telefon" ? (
            <>
              <button className="save-btn" onClick={() => saveEdit("telefon")}>
                Kaydet
              </button>
              <button className="cancel-btn" onClick={cancelEdit}>
                Vazgeç
              </button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => startEdit("telefon")}>
              Düzenle
            </button>
          )}
        </div>
      </div>

      <div className="profile-footer">
        <button
          className="secondary-btn"
          onClick={() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setPwdErrors("");
            setShowPwdModal(true);
          }}
        >
          Şifre Değiştirme
        </button>
        <button
          className="primary-btn"
          onClick={() => {
            // navigate back to the login page; use replace to avoid keeping admin page in history
            navigate("/", { replace: true });
          }}
        >
          Çıkış
        </button>
      </div>
      {/* Password change modal */}
      {showPwdModal && (
        <div className="modal-overlay" onClick={() => setShowPwdModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setShowPwdModal(false)}
              aria-label="kapat"
            >
              ✕
            </button>
            <div className="modal-body">
              <h4>Şifre Değiştir</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!oldPassword) {
                    setPwdErrors("Eski şifre boş olamaz.");
                    return;
                  }
                  if (!newPassword) {
                    setPwdErrors("Yeni şifre boş olamaz.");
                    return;
                  }
                  if (newPassword !== confirmPassword) {
                    setPwdErrors("Yeni şifre ve tekrarı eşleşmiyor.");
                    return;
                  }

                  setPwdErrors("");
                  const payload = { oldPassword, newPassword };
                  // TODO: call backend endpoint here. For now log and simulate success.
                  // Example: await api.post('/auth/change-password', payload)
                  // eslint-disable-next-line no-console
                  console.log("Change password payload:", payload);
                  setShowPwdModal(false);
                  setPwdChanged(true);
                }}
              >
                <div className="form-group">
                  <label>Eski Şifre</label>
                  <input
                    type="password"
                    className="form-input"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Yeni Şifre</label>
                  <input
                    type="password"
                    className="form-input"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Yeni Şifre (Tekrar)</label>
                  <input
                    type="password"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {pwdErrors && <div className="form-error">{pwdErrors}</div>}

                <div className="actions-row" style={{ marginTop: 12 }}>
                  <button type="submit" className="primary-btn">
                    Değiştir
                  </button>
                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowPwdModal(false)}
                    style={{ marginLeft: 8 }}
                  >
                    İptal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {pwdChanged && (
        <div className="modal-overlay" onClick={() => setPwdChanged(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setPwdChanged(false)}
              aria-label="kapat"
            >
              ✕
            </button>
            <div className="modal-body">
              <div className="success-message">
                Şifre başarıyla değiştirildi.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
