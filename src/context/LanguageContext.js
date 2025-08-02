// src/context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

const translations = {
  en: {
    home: "Home",
    signUp: "Sign Up",
    login: "Login",
    askAI: "Ask AI",
    landingTitle: "Explore the world with TravelPlanner",
    landingSubtitle: "Plan and book your adventures in one place.",
    welcomeTitle: "Welcome, {{name}}!",
    welcomeSubtitle: "Start planning your journey effortlessly.",
    carsTitle: "Search Car Rentals",
    hotelsTitle: "Search Hotels",
    flightsTitle: "Search Flights",
    restaurantsTitle: "Search Restaurants",
    searchButton: "Search",
    locationPlaceholder: "Location",
    originPlaceholder: "Origin",
    destinationPlaceholder: "Destination",
    datePlaceholder: "Date",
    checkInPlaceholder: "Check-in",
    nightsPlaceholder: "Nights",
    daysPlaceholder: "Days"
  },
  es: {
    home: "Inicio",
    signUp: "Registrarse",
    login: "Iniciar sesión",
    askAI: "Preguntar IA",
    landingTitle: "Explora el mundo con TravelPlanner",
    landingSubtitle: "Planifica y reserva tus aventuras en un solo lugar.",
    welcomeTitle: "¡Bienvenido, {{name}}!",
    welcomeSubtitle: "Comienza a planificar tu viaje fácilmente.",
    carsTitle: "Buscar alquiler de coches",
    hotelsTitle: "Buscar hoteles",
    flightsTitle: "Buscar vuelos",
    restaurantsTitle: "Buscar restaurantes",
    searchButton: "Buscar",
    locationPlaceholder: "Ubicación",
    originPlaceholder: "Origen",
    destinationPlaceholder: "Destino",
    datePlaceholder: "Fecha",
    checkInPlaceholder: "Check-in",
    nightsPlaceholder: "Noches",
    daysPlaceholder: "Días"
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const defaultLang = (navigator.language || "en").split("-")[0];
  const [language, setLanguage] = useState(
    localStorage.getItem("lang") || (translations[defaultLang] ? defaultLang : "en")
  );

  useEffect(() => {
    localStorage.setItem("lang", language);
  }, [language]);

  const t = (key, vars = {}) => {
    let str = translations[language][key] || key;
    Object.keys(vars).forEach(k => {
      str = str.replace(`{{${k}}}`, vars[k]);
    });
    return str;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
