import React, { useState } from "react";
import { fetchRideEstimate } from "../api";
import FloatingChatBot from "../components/FloatingChatBot"; // ✅ import only
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";

export default function RideEstimatePage() {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [estimate, setEstimate] = useState(null);
  const [summary, setSummary] = useState('');

  const search = async () => {
    try {
      const result = await fetchRideEstimate(pickup, dropoff);
      setEstimate(result);
      const summaryText = await summarizeResultsWithOpenAI("ride-estimates", [result]);
      setSummary(summaryText);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🚕 Ride Estimate</h2>
      <input
        value={pickup}
        onChange={e => setPickup(e.target.value)}
        placeholder="Pickup Location"
        style={{ marginRight: "1rem" }}
      />
      <input
        value={dropoff}
        onChange={e => setDropoff(e.target.value)}
        placeholder="Dropoff Location"
        style={{ marginRight: "1rem" }}
      />
      <button onClick={search}>Estimate</button>

      {estimate && (
        <p style={{ marginTop: "1rem" }}>
          Estimated fare: ${estimate.fare} — Duration: {estimate.duration} mins
        </p>
      )}

      <FloatingChatBot context={{ pickup, dropoff }} summary={summary} />
    </div>
  );
}
