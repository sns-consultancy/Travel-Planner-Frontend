import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/banner.png";
import styles from "./Landing.module.css";
import { useLanguage } from "../context/LanguageContext";

const Landing = () => {
  const { t } = useLanguage();
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero} style={{ backgroundImage: `url(${banner})` }}>
        <div className={styles.overlay}>
          <h1 className={styles.title}>{t("landingTitle")}</h1>
          <p className={styles.subtitle}>{t("landingSubtitle")}</p>
          <div className={styles.buttons}>
            <Link to="/signup" className={styles.primary}>{t("signUp")}</Link>
            <Link to="/login" className={styles.secondary}>{t("login")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
