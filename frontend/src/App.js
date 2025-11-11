import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import EmailEntry from "./pages/Auth/EmailEntry";
import CodeVerify from "./pages/Auth/CodeVerify";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import MemberAssignment from "./pages/Admin/MemberAssignment";
import CommissionMembers from "./pages/Admin/CommissionMembers";
import AdminProfile from "./pages/Admin/AdminProfile";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgotPassword" element={<EmailEntry />} />
          <Route path="/verificationCode" element={<CodeVerify />} />
          <Route path="/adminmainpage" element={<AdminMainPage />}>
            {/* default: show empty content area; profile opens only when user clicks the sidebar */}
            <Route index element={<div />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="member-assignment" element={<MemberAssignment />} />
            <Route path="commission-members" element={<CommissionMembers />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
