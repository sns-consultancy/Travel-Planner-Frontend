import React, { useState } from "react";
import { fetchRestaurants } from "../api";
import FloatingChatBot from "../components/FloatingChatBot";
import { summarizeResultsWithOpenAI } from "../utils/aiUtils";
import { useLanguage } from "../context/LanguageContext";

export default function RestaurantsPage() {
  const [location, setLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [summary, setSummary] = useState("");
  const { t } = useLanguage();

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
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h2 className="text-2xl font-semibold">🍽️ {t('restaurantsTitle')}</h2>
      <div className="flex flex-col space-y-2">
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder={t('locationPlaceholder')}
          className="border p-2 rounded"
        />
        <button onClick={search} className="bg-blue-600 text-white py-2 rounded">
          {t('searchButton')}
        </button>
      </div>

      <ul className="list-disc pl-5">
        {restaurants.map(r => (
          <li key={r.name}>
            {r.name} - {r.cuisine} - {r.rating}/5
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ location }} summary={summary} />
    </div>
  );
}
