import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
export default function HomePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { firstName: "Traveler" };
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>:airplane: Welcome, {user.firstName}!</h1>
        <p className={styles.subtitle}>Start planning your journey effortlessly.</p>
        <div className={styles.buttonRow}>
          <Link to="/signup" className={styles.primaryButton}>:closed_lock_with_key: Sign Up</Link>
          <Link to="/login" className={styles.secondaryButton}>:unlock: Login</Link>
        </div>
        <div className={styles.chatbotContainer}>
          <iframe
            title="AI Travel Chatbot"
            src="https://your-chatbot-url-or-component"
            width="100%"
            height="300"
            style={{ border: "1px solid #ccc", borderRadius: "8px" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
