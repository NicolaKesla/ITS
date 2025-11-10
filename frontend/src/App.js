import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import EmailEntry from "./pages/Auth/EmailEntry";
import CodeVerify from "./pages/Auth/CodeVerify";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import MemberAssignment from "./pages/Admin/MemberAssignment";
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
            <Route index element={<AdminProfile />} />
            <Route path="member-assignment" element={<MemberAssignment />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
