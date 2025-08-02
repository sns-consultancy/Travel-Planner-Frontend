import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner2.jpg.png";
import styles from "./Home.module.css";
import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : { firstName: "Traveler" };
  const { t } = useLanguage();

  return (
    <div className={styles.wrapper}>
      <div className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>✈️ {t("welcomeTitle", { name: user.firstName })}</h1>
          <p className={styles.subtitle}>{t("welcomeSubtitle")}</p>
          <div className={styles.buttonRow}>
            <Link to="/signup" className={styles.primaryButton}>🔐 {t("signUp")}</Link>
            <Link to="/login" className={styles.secondaryButton}>🔓 {t("login")}</Link>
          </div>
        </div>
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
  );
}
