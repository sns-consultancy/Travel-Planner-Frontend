import React, { useState } from "react";
import { fetchFlights } from "../api";
import FloatingChatBot from "../components/FloatingChatBot";
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";

export default function FlightsPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [summary, setSummary] = useState("");

  const search = async () => {
    try {
      const results = await fetchFlights(origin, destination, date);
      setFlights(results);
      const summaryText = await summarizeResultsWithOpenAI("flights", results);
      setSummary(summaryText);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>✈️ Search Flights</h2>
      <input
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        placeholder="Origin"
        style={{ marginRight: "1rem" }}
      />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        style={{ marginRight: "1rem" }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <button onClick={search}>Search</button>

      <ul style={{ marginTop: "1rem" }}>
        {flights.map((f) => (
          <li key={f.flight_number}>
            {f.airline} {f.flight_number} - ${f.price}
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ origin, destination, date }} summary={summary} />
    </div>
  );
}
