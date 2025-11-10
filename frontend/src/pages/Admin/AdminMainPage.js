import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminMainPage.css";
import GtuLogo from "../../assets/main-page-logo.png";

const AdminMainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <img src={GtuLogo} alt="GTU" className="sidebar-logo" />
          <div className="system-name">Staj Takip Sistemi</div>
        </div>

        <nav className="sidebar-menu">
          <button
            className="menu-item"
            onClick={() => navigate("/adminmainpage")}
          >
            Profilim
          </button>
          <button
            className="menu-item"
            onClick={() => navigate("member-assignment")}
          >
            Komisyon Üyesi Atama
          </button>
          <button className="menu-item">Komisyon Üye Bilgileri</button>
          <div className="menu-spacer" />
        </nav>
      </aside>

      <main className="admin-content">
        <div className="content-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminMainPage;
