import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Landing.module.css";

const Landing = () => (
  <div className="landing">
    <h1>Welcome to TravelPlanner</h1>
    <p>Plan your dream trips with ease!</p>
    <div className="landing-buttons">
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
    </div>
  </div>
);

export default Landing;



{/*import React from "react";
import { Link } from "react-router-dom";
function Landing() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to <strong>TravelPlanner</strong></h1>
      <p>Plan your dream trips with ease!</p>
      <div style={{ marginTop: "1rem" }}>
        <Link to="/signup" style={{ marginRight: "1rem", textDecoration: "none", color: "blue" }}>
          Sign Up
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
          Login
        </Link>
      </div>
    </div>
  );
}
export default Landing;
*/}