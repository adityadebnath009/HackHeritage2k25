import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import Login from "./components/Login.jsx";
import HealthHub from "./components/HealthHub";
import Profile from "./components/Profile.jsx";
import ProgramTracker from "./components/ProgramTracker";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/program-tracker" element={<ProgramTracker />} />
        <Route path="/health-hub" element={<HealthHub />} />
        <Route path="/profile" element={<Profile />} />

        
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
    </Router>
  );
}