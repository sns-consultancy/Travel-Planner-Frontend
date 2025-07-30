import React, { useState } from 'react';
import { fetchCars } from '../api';
import FloatingChatBot from '../components/FloatingChatBot';
import { summarizeResultsWithOpenAI } from '../utils/aiUtils';

export default function CarsPage() {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(1);
  const [cars, setCars] = useState([]);
  const [summary, setSummary] = useState('');

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
    <div style={{ padding: "2rem" }}>
      <h2>🚗 Search Car Rentals</h2>
      <input
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Location"
        style={{ marginRight: '1rem' }}
      />
      <input
        type="date"
        value={startDate}
        onChange={e => setStartDate(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <input
        type="number"
        min="1"
        value={days}
        onChange={e => setDays(e.target.value)}
        style={{ marginRight: '1rem' }}
      />
      <button onClick={search}>Search</button>

      <ul style={{ marginTop: '1rem' }}>
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
