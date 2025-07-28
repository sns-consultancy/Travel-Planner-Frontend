import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{
      padding: "2rem",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f5f5f5",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        ✈️ Welcome to the TravelPlanner App
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
        Start planning your journey effortlessly.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        <Link
          to="/signup"
          style={{
            textDecoration: "none",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4caf50",
            color: "white",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          🔐 Sign Up
        </Link>
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: "6px",
            fontWeight: "bold"
          }}
        >
          🔓 Login
        </Link>
      </div>
    </div>
  );
}