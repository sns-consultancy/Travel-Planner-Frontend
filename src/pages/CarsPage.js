import React, { useState } from 'react';
import { fetchCars } from '../api';
import FloatingChatBot from '../components/FloatingChatBot';
import { summarizeResultsWithOpenAI } from '../utils/aiUtils';
import { useLanguage } from '../context/LanguageContext';

export default function CarsPage() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(1);
  const [cars, setCars] = useState([]);
  const [summary, setSummary] = useState('');
  const { t } = useLanguage();

  const search = async () => {
    try {
      const results = await fetchCars(location, startDate, days);
      setCars(results);
      const summaryText = await summarizeResultsWithOpenAI("cars", results);
      setSummary(summaryText);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 space-y-4">
      <h2 className="text-2xl font-semibold">🚗 {t('carsTitle')}</h2>
      <div className="flex flex-col space-y-2">
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder={t('locationPlaceholder')}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          min="1"
          value={days}
          onChange={e => setDays(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={search} className="bg-blue-600 text-white py-2 rounded">
          {t('searchButton')}
        </button>
      </div>

      <ul className="list-disc pl-5">
        {cars.map(c => (
          <li key={c.company}>
            {c.company} {c.model} - ${c.daily_rate}/day
          </li>
        ))}
      </ul>

      <FloatingChatBot context={{ location, startDate, days }} summary={summary} />
    </div>
  );
}
