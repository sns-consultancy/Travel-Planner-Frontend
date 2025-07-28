import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // fixed import: default export, not { jwtDecode }
import { useAuth } from "../context/AuthContext";
import styles from "./Signup.module.css";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Upload,
  Mic,
  Fingerprint,
  Smile,
  CheckCircle,
} from "lucide-react";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Multi-step form state
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);

  // Consent checkboxes
  const [agreed, setAgreed] = useState(false);
  const [consentGmail, setConsentGmail] = useState(false);
  const [consentPhone, setConsentPhone] = useState(false);

  // OTP state
  const [otp, setOtp] = useState("");

  // Loading and error/success messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle form inputs (including file)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Voice input using Web Speech API
  const handleVoiceInput = (field) => {
    if (!window.webkitSpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData((prev) => ({ ...prev, [field]: transcript }));
    };
  };

  // Biometric placeholder handlers
  const handleFaceId = () => {
    alert("Face ID simulated. (Use WebAuthn APIs for real biometrics.)");
  };
  const handleThumbprint = () => {
    alert("Thumbprint simulated. (Use WebAuthn APIs for real biometrics.)");
  };

  // Step 1 form validation and proceed to OTP step
  const handleSubmitDetails = (e) => {
    e.preventDefault();
    if (!formData.email && !formData.mobile) {
      setMessage("Please provide either Email or Mobile Number.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setMessage("You must agree to the terms.");
      return;
    }
    setMessage("");
    setStep(2);
  };

  // OTP verification step
  const handleVerifyOtp = () => {
    if (otp.trim() === "123456") {
      setStep(3);
      setMessage("");
      handleRegister();
    } else {
      setMessage("Invalid OTP. Try 123456 for demo.");
    }
  };

  // Final registration using AuthContext's signup(email, password)
  const handleRegister = async () => {
    try {
      setLoading(true);
      setMessage("");

      // Here signup only accepts email and password
      // You might want to extend your signup function to accept more profile info or
      // separately save profile data in your backend after signup.

      await signup(formData.email, formData.password);

      // Optionally upload photo and other data separately here if needed

      setMessage("Registration successful!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setMessage(err.message || "Registration failed.");
      setStep(1); // Go back to step 1 for retry
    } finally {
      setLoading(false);
    }
  };

  // Handle Google login via AuthContext
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
      setMessage("Google sign-up successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      setMessage("Google sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  // Optional: GoogleLogin button callback that decodes token and fills form (if you want to keep it)
  const onGoogleSuccess = (credentialResponse) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      setFormData((prev) => ({
        ...prev,
        email: decoded.email || "",
        fullName: decoded.name || "",
      }));
      setMessage("Google sign-in data loaded into form.");
    }
  };
  const onGoogleError = () => {
    setMessage("Google sign-in failed.");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Create Your Health Profile</h2>

        {step === 1 && (
          <form onSubmit={handleSubmitDetails} className={styles.form}>
            {/* Full Name */}
            <label className={styles.label}>
              <User />
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                onClick={() => handleVoiceInput("fullName")}
                className={styles.iconButton}
                disabled={loading}
              >
                <Mic size={16} />
              </button>
            </label>

            {/* DOB */}
            <label className={styles.label}>
              <Calendar />
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </label>

            {/* Email */}
            <label className={styles.label}>
              <Mail />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => handleVoiceInput("email")}
                className={styles.iconButton}
                disabled={loading}
              >
                <Mic size={16} />
              </button>
            </label>

            {/* Mobile */}
            <label className={styles.label}>
              <Phone />
              <input
                name="mobile"
                type="tel"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                disabled={loading}
              />
            </label>

            {/* Country */}
            <label className={styles.label}>
              <MapPin />
              <input
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                disabled={loading}
              />
            </label>

            {/* Password */}
            <label className={styles.label}>
              <Lock />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                required
                minLength={6}
              />
            </label>

            {/* Confirm Password */}
            <label className={styles.label}>
              <Lock />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
                required
                minLength={6}
              />
            </label>

            {/* Profile Photo */}
            <label className={styles.label}>
              <Upload />
              <input
                name="profilePhoto"
                type="file"
                onChange={handleChange}
                disabled={loading}
                accept="image/*"
              />
            </label>
            {photoPreview && (
              <div className={styles.preview}>
                <img src={photoPreview} alt="Preview" />
              </div>
            )}

            {/* Consents */}
            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                disabled={loading}
                required
              />
              <span>
                I agree to the{" "}
                <a href="/terms" target="_blank" rel="noreferrer">
                  Terms
                </a>{" "}
                and{" "}
                <a href="/privacy" target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>
                .
              </span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={consentGmail}
                onChange={(e) => setConsentGmail(e.target.checked)}
                disabled={loading}
              />
              <span>Sync Gmail contacts</span>
            </label>

            <label className={styles.checkbox}>
              <input
                type="checkbox"
                checked={consentPhone}
                onChange={(e) => setConsentPhone(e.target.checked)}
                disabled={loading}
              />
              <span>Sync phone contacts</span>
            </label>

            {/* Biometric Buttons */}
            <div className={styles.actionsRow}>
              <button
                type="button"
                onClick={handleFaceId}
                className={styles.secondaryButton}
                disabled={loading}
              >
                <Smile size={16} />
                Face ID
              </button>
              <button
                type="button"
                onClick={handleThumbprint}
                className={styles.secondaryButton}
                disabled={loading}
              >
                <Fingerprint size={16} />
                Thumbprint
              </button>
            </div>

            {/* Continue Button */}
            <button
              className={styles.button}
              disabled={loading}
              type="submit"
            >
              Continue
            </button>

            {/* Google Sign In using AuthContext loginWithGoogle */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className={styles.googleButton}
              disabled={loading}
            >
              Sign up with Google
            </button>
          </form>
        )}

        {/* OTP Verification */}
        {step === 2 && (
          <div className={styles.form}>
            <p>Enter the OTP sent to your email or mobile:</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP (use 123456)"
              disabled={loading}
            />
            <button
              onClick={handleVerifyOtp}
              className={styles.button}
              disabled={loading}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Success */}
        {step === 3 && (
          <div className={styles.success}>
            <CheckCircle size={48} />
            <p>Account created successfully! Redirecting...</p>
          </div>
        )}

        {/* Message */}
        {message && (
          <p
            className={
              message.toLowerCase().includes("successful")
                ? styles.success
                : styles.error
            }
          >
            {message}
          </p>
        )}

        {/* Footer */}
        <p className={styles.footer}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
