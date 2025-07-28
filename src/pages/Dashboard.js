import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
export default function Dashboard() {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { firstName: "Traveler" };
  return (
    <div className={styles.wrapper}>
      <div className={styles.banner}>
        <div className={styles.overlay}>
          <h1 className={styles.heroTitle}>Welcome back, {user.firstName}! :earth_africa:</h1>
          <p className={styles.heroSubtitle}>Your all-in-one travel planning dashboard.</p>
        </div>
      </div>
      <div className={styles.widgets}>
        {/* :electric_plug: Weather Widget */}
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
        {/* :speech_balloon: Chatbot Embed */}
        <div className={styles.chatbotBox}>
          <iframe
            title="Travel Chatbot"
            src="REACT_APP_OPENAI_API_KEY"
            width="100%"
            height="240"
            style={{ border: "1px solid #ccc", borderRadius: "12px" }}
          ></iframe>
        </div>
      </div>
      {/* :luggage: Trip Planner Actions */}
      <div className={styles.card}>
        <h2 className={styles.heading}>:luggage: Plan Your Next Trip</h2>
        <p className={styles.description}>Quick actions to get started:</p>
        <div className={styles.grid}>
          <button onClick={() => navigate("/planner")}>:date: New Itinerary</button>
          <button onClick={() => navigate("/chatbot")}>:robot_face: Ask AI</button>
          <button onClick={() => navigate("/history")}>:scroll: Trip History</button>
        </div>
      </div>
    </div>
  );
}