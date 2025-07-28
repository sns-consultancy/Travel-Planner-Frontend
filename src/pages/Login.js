// src/pages/Login.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // fix import (not named import)
import { useAuth } from "../context/AuthContext";
import styles from "./Signup.module.css";
import {
  User,
  Lock,
  Mic,
  Loader,
  Smile,
  Fingerprint,
} from "lucide-react";

// Speech synthesis for welcome message
const speakWelcome = (username) => {
  const utterance = new SpeechSynthesisUtterance(`Welcome back, ${username}.`);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [username, setUsername] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [useFaceId, setUseFaceId] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  const navigate = useNavigate();
  const usernameInputRef = useRef();

  useEffect(() => {
    usernameInputRef.current?.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const performLogin = async () => {
    setError("");
    setMessage("");

    if (!username) {
      setError("Please enter username or email.");
      return;
    }
    if (!useFaceId && !password) {
      setError("Please enter password or enable Face ID.");
      return;
    }

    try {
      setLoading(true);
      if (useFaceId) {
        // Simulate FaceID login — replace with WebAuthn in real app
        alert("Face ID simulated. (Use WebAuthn APIs for real biometrics.)");
        localStorage.setItem("token", "loggedin");
        localStorage.setItem("user", JSON.stringify({ firstName: username }));
        speakWelcome(username);
        navigate("/dashboard");
      } else {
        // Use your Firebase login email/password
        await login(username, password);
        localStorage.setItem("token", "loggedin");
        localStorage.setItem("user", JSON.stringify({ firstName: username, email: username }));
        speakWelcome(username);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    performLogin();
  };

  const handleVoiceInput = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      setUsername(transcript);
    };
  };

  const handleVoiceLogin = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim().toLowerCase();
      if (transcript.includes("login") || transcript.includes("sign in")) {
        if (!username) setUsername("demoUser");
        if (!password && !useFaceId) setPassword("demoPassword");
        performLogin();
      } else {
        alert("Say 'login' or 'sign in' to continue.");
      }
    };
  };

  const handleFaceIdClick = () => {
    alert("Face ID simulated. (Use WebAuthn APIs for real biometrics.)");
  };

  const handleThumbprintClick = () => {
    alert("Thumbprint simulated. (Use WebAuthn APIs for real biometrics.)");
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) throw new Error("No credential returned");

      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google User:", decoded);

      // Call your Firebase Google login method if you want:
      // await loginWithGoogle();

      localStorage.setItem("token", "loggedin");
      localStorage.setItem(
        "user",
        JSON.stringify({ email: decoded.email, firstName: decoded.name })
      );
      setMessage("Google login successful!");
      speakWelcome(decoded.name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed");
    }
  };

  return (
    <div
      className={`${styles.pageWrapper} ${darkMode ? styles.dark : ""}`}
      style={{ transition: "background 0.3s ease" }}
    >
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={styles.toggleDark}
          type="button"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
        {message && (
          <p
            className={
              message.toLowerCase().includes("success")
                ? styles.success
                : styles.error
            }
          >
            {message}
          </p>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <label className={styles.label}>
            <User />
            <input
              ref={usernameInputRef}
              placeholder="Username or Email"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              disabled={loading}
            />
            <button
              type="button"
              onClick={handleVoiceInput}
              className={styles.iconButton}
            >
              <Mic size={16} />
            </button>
          </label>

          {!useFaceId && (
            <label className={styles.label}>
              <Lock />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={loading}
              />
            </label>
          )}

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={useFaceId}
              onChange={(e) => setUseFaceId(e.target.checked)}
              disabled={loading}
            />
            <span>Use Face ID / Touch ID</span>
          </label>

          <div className={styles.actionsRow}>
            <button
              type="button"
              onClick={handleFaceIdClick}
              className={styles.secondaryButton}
              disabled={loading}
            >
              <Smile size={16} />
              Face ID
            </button>
            <button
              type="button"
              onClick={handleThumbprintClick}
              className={styles.secondaryButton}
              disabled={loading}
            >
              <Fingerprint size={16} />
              Thumbprint
            </button>
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <>
                <Loader className={styles.spin} size={18} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <div className={styles.googleButton}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                setError("Google login failed.");
              }}
            />
          </div>
        </form>

        <button
          type="button"
          onClick={handleVoiceLogin}
          disabled={loading}
          className={styles.button}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <Mic /> Voice Login
        </button>

        <p className={styles.footer}>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
