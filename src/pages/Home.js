import React, { useState } from "react";
import "./Home.module.css";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { username: "Traveler" };

  return (
    <div className="home">
      <h1>Welcome, {user.username}!</h1>
      <p>Start planning your next adventure.</p>
    </div>
  );
};

export default Home;