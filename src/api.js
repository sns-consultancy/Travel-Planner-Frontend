const API_BASE = 'http://localhost:8000';

async function request(path, params = {}) {
  const url = new URL(API_BASE + path);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}

export function fetchFlights(origin, destination, date) {
  return request('/flights', { origin, destination, date });
}

export function fetchHotels(destination, check_in, nights) {
  return request('/hotels', { destination, check_in, nights });
}

export function fetchCars(location, start_date, days) {
  return request('/cars', { location, start_date, days });
}

export function fetchRestaurants(location) {
  return request('/restaurants', { location });
}

export function fetchRideEstimate(pickup, dropoff) {
  return request('/ride-estimate', { pickup, dropoff });
}