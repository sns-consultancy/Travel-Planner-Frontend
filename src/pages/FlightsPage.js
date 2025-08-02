import React, { useState } from "react";
import { fetchFlights } from "../api";
import FloatingChatBot from "../components/FloatingChatBot";
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";
import { useLanguage } from "../context/LanguageContext";

export default function FlightsPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [flights, setFlights] = useState([]);
  const [summary, setSummary] = useState("");
  const { t } = useLanguage();

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
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h2 className="text-2xl font-semibold">✈️ {t('flightsTitle')}</h2>
      <div className="flex flex-col space-y-2">
        <input
          value={origin}
          onChange={e => setOrigin(e.target.value)}
          placeholder={t('originPlaceholder')}
          className="border p-2 rounded"
        />
        <input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder={t('destinationPlaceholder')}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={search} className="bg-blue-600 text-white py-2 rounded">
          {t('searchButton')}
        </button>
      </div>

      <ul className="list-disc pl-5">
        {flights.map(f => (
          <li key={f.flight_number}>
            {f.airline} {f.flight_number} - ${f.price}
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ origin, destination, date }} summary={summary} />
    </div>
  );
}
