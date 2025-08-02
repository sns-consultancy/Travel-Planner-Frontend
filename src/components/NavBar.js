import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/banner1.jpg.png";
import styles from "./NavBar.module.css";
import { useLanguage } from "../context/LanguageContext";

const apps = [
  { name: "GingerTips", url: "https://gingertips.vercel.app" },
  { name: "OneDoctor", url: "https://onedoctor.vercel.app" },
  { name: "LifeSync", url: "https://lifesync.vercel.app" },
  { name: "TravelPlanner", url: "https://travelplanner.vercel.app" },
  { name: "MoneyMatters", url: "https://moneymatters.vercel.app" },
  { name: "EduMentor", url: "https://edumentor.vercel.app" },
  { name: "FitNest", url: "https://fitnest.vercel.app" },
  { name: "HomeGenie", url: "https://homegenie.vercel.app" },
  { name: "LegalAid", url: "https://legalaid.vercel.app" },
  { name: "Investify", url: "https://investify.vercel.app" },
];

const NavBar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const hideOnPaths = ["/", "/login", "/signup"];
  if (hideOnPaths.includes(location.pathname)) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/home" className={styles.logoLink}>
        <img src={logo} alt="TravelPlanner" className={styles.logo} />
      </Link>
      <div className={styles.links}>
        <Link to="/home">{t("home")}</Link>
        <Link to="/signup">{t("signUp")}</Link>
        <Link to="/login">{t("login")}</Link>
        <Link to="/floatingchatbot">{t("askAI")}</Link>
        {apps.map((app) => (
          <a key={app.name} href={app.url} target="_blank" rel="noopener noreferrer">
            {app.name}
          </a>
        ))}
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className={styles.langSelect}
        >
          <option value="en">EN</option>
          <option value="es">ES</option>
        </select>
        {user && (
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
