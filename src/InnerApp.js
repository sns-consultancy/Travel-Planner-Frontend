// InnerApp.js
import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import AIChatbot from "./components/AIChatbot";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
export default function InnerApp() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const hideNav = ["/", "/login", "/signup"].includes(location.pathname);
  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      {!hideNav && (
        <nav className="navbar">
          <div className="nav-left">
            <h2>Travel Planner</h2>
          </div>
          <div className="nav-right">
            <div className="dropdown" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}>☰</button>
              {menuOpen && (
                <div className="dropdown-menu">
                  <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
                  <Link to="/chatbot" onClick={() => setMenuOpen(false)}>Chatbot</Link>
                  <button onClick={() => { handleLogout(); setMenuOpen(false); }}>
                    Logout
                  </button>
                </div>
              )}
            </div>
            <button onClick={() => setDarkMode(prev => !prev)}>
              {darkMode ? ":sun_with_face:" : ":crescent_moon:"}
            </button>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chatbot" element={<AIChatbot />} />
      </Routes>
      {!hideNav && (
        <footer>
          <p>© 2025 Travel Planner App. All rights reserved.</p>
        </footer>
      )}
    </div>
  );
}