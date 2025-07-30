import React from "react";
import { useNavigate } from "react-router-dom";
import banner from "../assets/banner.png";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { firstName: "Traveler" };

  return (
    <div className={styles.wrapper}>
      <div className={styles.banner} style={{ backgroundImage: `url(${banner})` }}>
        <div className={styles.overlay}>
          <h1 className={styles.heroTitle}>Welcome back, {user.firstName}! 🌍</h1>
          <p className={styles.heroSubtitle}>Your all-in-one travel planning dashboard.</p>
        </div>
      </div>

      <div className={styles.widgets}>
        {/* 🌤️ Weather Widget */}
        <div className={styles.weatherBox}>
          <iframe
            title="Weather"
            src="https://weatherwidget.io/w/"
            width="100%"
            height="160"
            frameBorder="0"
            scrolling="no"
            style={{ borderRadius: "12px" }}
          ></iframe>
        </div>

        {/* 💬 Chatbot Embed */}
        <div className={styles.chatbotBox}>
          <iframe
            title="Travel Chatbot"
            src="https://your-embedded-chatbot-url"  // replace with real chatbot URL
            width="100%"
            height="240"
            style={{ border: "1px solid #ccc", borderRadius: "12px" }}
          ></iframe>
        </div>
      </div>

      {/* 🧳 Trip Planner Actions */}
      <div className={styles.card}>
        <h2 className={styles.heading}>🧳 Plan Your Next Trip</h2>
        <p className={styles.description}>Quick actions to get started:</p>
        <div className={styles.grid}>
          <button onClick={() => navigate("/planner")}>📅 New Itinerary</button>
          <button onClick={() => navigate("/chatbot")}>🤖 Ask AI</button>
          <button onClick={() => navigate("/history")}>📜 Trip History</button>
        </div>
      </div>
    </div>
  );
}
