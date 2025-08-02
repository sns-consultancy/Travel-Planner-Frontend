import React, { useState } from "react";
import { fetchHotels } from "../api";
import FloatingChatBot from "../components/FloatingChatBot";
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";
import { useLanguage } from "../context/LanguageContext";

export default function HotelsPage() {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNights] = useState(1);
  const [hotels, setHotels] = useState([]);
  const [summary, setSummary] = useState("");
  const { t } = useLanguage();

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
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h2 className="text-2xl font-semibold">🏨 {t('hotelsTitle')}</h2>
      <div className="flex flex-col space-y-2">
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder={t('destinationPlaceholder') || 'Destination'}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={checkIn}
          onChange={e => setCheckIn(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          min="1"
          value={nights}
          onChange={e => setNights(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={search} className="bg-blue-600 text-white py-2 rounded">
          {t('searchButton')}
        </button>
      </div>

      <ul className="list-disc pl-5">
        {hotels.map(h => (
          <li key={h.name}>
            {h.name} - ${h.price_per_night}/night
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ destination, checkIn, nights }} summary={summary} />
    </div>
  );
}
