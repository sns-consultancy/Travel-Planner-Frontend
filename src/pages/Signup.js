import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import styles from "./Signup.module.css";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [useFaceId, setUseFaceId] = useState(false);
  const [useThumb, setUseThumb] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript;
      setFormData((p) => ({ ...p, email: text }));
    };
    recognition.start();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      if (useFaceId || useThumb) {
        alert("Biometric signup simulated.");
      }
      await signup(formData.email, formData.password);
      setMessage("Signup successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error("Signup error:", err);
      setMessage(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credential = credentialResponse.credential;
      if (!credential) throw new Error("No Google credential found");
      await loginWithGoogle(credential);
      setMessage("Google signup successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (err) {
      console.error("Google Signup Error:", err);
      setMessage("Google signup failed.");
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Sign Up</h2>
        {message && (
          <p className={message.toLowerCase().includes("success") ? styles.success : styles.error}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={startVoiceInput} className={styles.iconButton} disabled={loading}>🎤</button>
          </label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={6}
          />
          <div className={styles.actionsRow}>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={useFaceId} onChange={(e) => setUseFaceId(e.target.checked)} />
              <span>Use Face ID</span>
            </label>
            <label className={styles.checkbox}>
              <input type="checkbox" checked={useThumb} onChange={(e) => setUseThumb(e.target.checked)} />
              <span>Use Thumbprint</span>
            </label>
          </div>
          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <div className={styles.googleButton}>
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setMessage("Google login failed")} />
        </div>
        <p className={styles.footer}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
