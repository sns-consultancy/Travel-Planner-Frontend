import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../context/AuthContext";
import styles from "./Signup.module.css";
const speakWelcome = (username) => {
  const utterance = new SpeechSynthesisUtterance(`Welcome back, ${username}.`);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};
export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [useFaceId, setUseFaceId] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  useEffect(() => {
    emailRef.current?.focus();
  }, []);
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  const performLogin = async () => {
    setError("");
    setMessage("");
    if (!email) return setError("Please enter your email.");
    if (!useFaceId && !password) return setError("Enter password or enable Face ID.");
    try {
      setLoading(true);
      if (useFaceId) {
        alert("Face ID simulated.");
        localStorage.setItem("token", "loggedin");
        localStorage.setItem("user", JSON.stringify({ firstName: email }));
        speakWelcome(email);
        navigate("/dashboard");
      } else {
        await login(email, password);
        localStorage.setItem("token", "loggedin");
        localStorage.setItem("user", JSON.stringify({ email }));
        speakWelcome(email);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      if (!credential) throw new Error("Missing Google credential.");
      const decoded = jwtDecode(credential);
      await loginWithGoogle(credential);
      localStorage.setItem("token", "loggedin");
      localStorage.setItem("user", JSON.stringify({
        email: decoded.email,
        firstName: decoded.name,
      }));
      setMessage("Google login successful!");
      speakWelcome(decoded.name);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed.");
    }
  };
  return (
    <div className={`${styles.pageWrapper} ${darkMode ? styles.dark : ""}`}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={styles.toggleDark}
          type="button"
        >
          {darkMode ? ":sunny: Light Mode" : ":crescent_moon: Dark Mode"}
        </button>
        {error && <p className={styles.error}>{error}</p>}
        {message && (
          <p className={message.toLowerCase().includes("success") ? styles.success : styles.error}>
            {message}
          </p>
        )}
        <form onSubmit={(e) => { e.preventDefault(); performLogin(); }} className={styles.form}>
          <label className={styles.label}>
            Email:
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              placeholder="Enter email"
            />
          </label>
          {!useFaceId && (
            <label className={styles.label}>
              Password:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                placeholder="Enter password"
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
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className={styles.googleButton}>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => setError("Google login failed.")}
            />
          </div>
        </form>
        <p className={styles.footer}>
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
