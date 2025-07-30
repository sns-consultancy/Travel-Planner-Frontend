import React from "react";
import { Link } from "react-router-dom";

const apps = [
  { name: "EduMentor", emoji: "📚" },
  { name: "Investify", emoji: "📈" },
  { name: "OneDoctor", emoji: "🩺" },
  { name: "GingerTips", emoji: "🌿" },
  { name: "LegalAid", emoji: "⚖️" },
  { name: "HomeGenie", emoji: "🏡" },
  { name: "FitNest", emoji: "💪" },
  { name: "LifeSync", emoji: "🔗" },
  { name: "MoneyMatters", emoji: "💰" },
  { name: "TravelPlanner", emoji: "✈️" }
];

export default function AppLauncherDashboard() {
  return (
    <div style={{
      padding: "2rem",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "1rem"
    }}>
      {apps.map(app => (
        <Link
          key={app.name}
          to={`/${app.name.toLowerCase()}`}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textDecoration: "none",
            background: "#f9f9f9",
            color: "#333",
            transition: "all 0.2s"
          }}
        >
          <span style={{ fontSize: "2rem" }}>{app.emoji}</span>
          <span style={{ marginTop: "0.5rem", fontWeight: "bold" }}>{app.name}</span>
        </Link>
      ))}
    </div>
  );
}
