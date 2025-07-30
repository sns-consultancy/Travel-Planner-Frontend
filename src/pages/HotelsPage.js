import React, { useState } from "react";
import { fetchHotels } from "../api";
import FloatingChatBot from "../components/FloatingChatBot";
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";

export default function HotelsPage() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [summary, setSummary] = useState("");

  const search = async () => {
    try {
      const results = await fetchHotels(destination, checkIn, nights);
      setHotels(results);
      const summaryText = await summarizeResultsWithOpenAI("hotels", results);
      setSummary(summaryText);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🏨 Search Hotels</h2>
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        style={{ marginRight: "1rem" }}
      />
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <input
        type="number"
        min="1"
        value={nights}
        onChange={(e) => setNights(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <button onClick={search}>Search</button>

      <ul style={{ marginTop: "1rem" }}>
        {hotels.map((h) => (
          <li key={h.name}>
            {h.name} - ${h.price_per_night}/night
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ destination, checkIn, nights }} summary={summary} />
    </div>
  );
}
