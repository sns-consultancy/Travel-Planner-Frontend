import React, { useState } from "react";
import { fetchRestaurants } from "../api";
import FloatingChatBot from "../components/FloatingChatBot";
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";

export default function RestaurantsPage() {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [summary, setSummary] = useState("");

  const search = async () => {
    try {
      const results = await fetchRestaurants(location);
      setRestaurants(results);
      const summaryText = await summarizeResultsWithOpenAI("restaurants", results);
      setSummary(summaryText);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🍽️ Search Restaurants</h2>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Location"
        style={{ marginRight: "1rem" }}
      />
      <button onClick={search}>Search</button>

      <ul style={{ marginTop: "1rem" }}>
        {restaurants.map((r) => (
          <li key={r.name}>
            {r.name} - {r.cuisine} - {r.rating}/5
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ location }} summary={summary} />
    </div>
  );
}
