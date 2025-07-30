import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Disclaimer from "./pages/Disclaimer";
import Dashboard from "./pages/Dashboard";
import FloatingChatBot from "./components/FloatingChatBot";
import LegalFooter from "./components/LegalFooter";

const AppLauncherDashboard = lazy(() => import("./pages/AppLauncherDashboard"));
const GingerTips = lazy(() => import("./pages/GingerTips"));
const OneDoctor = lazy(() => import("./pages/OneDoctor"));
const LifeSync = lazy(() => import("./pages/LifeSync"));
const TravelPlanner = lazy(() => import("./pages/TravelPlanner"));
const MoneyMatters = lazy(() => import("./pages/MoneyMatters"));
const EduMentor = lazy(() => import("./pages/EduMentor"));
const FitNest = lazy(() => import("./pages/FitNest"));
const HomeGenie = lazy(() => import("./pages/HomeGenie"));
const LegalAid = lazy(() => import("./pages/LegalAid"));
const Investify = lazy(() => import("./pages/Investify"));

import FlightsPage from "./pages/FlightsPage";
import HotelsPage from "./pages/HotelsPage";
import CarsPage from "./pages/CarsPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import RideEstimatePage from "./pages/RideEstimatePage";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" replace />;
}

const HomePage = () => (
  <div style={{ padding: '2rem' }}>
    <h1>🏠 TravelPlanner Home</h1>
    <FloatingChatBot />
    <p>Navigate to <code>/dashboard</code> or <code>/apps</code>, or chat with FloatingChatBot 👇</p>
  </div>
);

export default function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider>
        <LanguageProvider>
          <DarkModeProvider>
            <Router>
              <Navbar />
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  {/* Public */}
                  <Route path="/" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />

                  {/* Protected */}
                  <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                  <Route path="/apps" element={<PrivateRoute><AppLauncherDashboard /></PrivateRoute>} />
                  <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/gingertips" element={<PrivateRoute><GingerTips /></PrivateRoute>} />
                  <Route path="/onedoctor" element={<PrivateRoute><OneDoctor /></PrivateRoute>} />
                  <Route path="/lifesync" element={<PrivateRoute><LifeSync /></PrivateRoute>} />
                  <Route path="/travelplanner" element={<PrivateRoute><TravelPlanner /></PrivateRoute>} />
                  <Route path="/moneymatters" element={<PrivateRoute><MoneyMatters /></PrivateRoute>} />
                  <Route path="/edumentor" element={<PrivateRoute><EduMentor /></PrivateRoute>} />
                  <Route path="/fitnest" element={<PrivateRoute><FitNest /></PrivateRoute>} />
                  <Route path="/homegenie" element={<PrivateRoute><HomeGenie /></PrivateRoute>} />
                  <Route path="/legalaid" element={<PrivateRoute><LegalAid /></PrivateRoute>} />
                  <Route path="/investify" element={<PrivateRoute><Investify /></PrivateRoute>} />
                  <Route path="/floatingchatbot" element={<PrivateRoute><FloatingChatBot /></PrivateRoute>} />

                  {/* TravelPlanner Subroutes */}
                  <Route path="/flights" element={<PrivateRoute><FlightsPage /></PrivateRoute>} />
                  <Route path="/hotels" element={<PrivateRoute><HotelsPage /></PrivateRoute>} />
                  <Route path="/cars" element={<PrivateRoute><CarsPage /></PrivateRoute>} />
                  <Route path="/restaurants" element={<PrivateRoute><RestaurantsPage /></PrivateRoute>} />
                  <Route path="/rides" element={<PrivateRoute><RideEstimatePage /></PrivateRoute>} />

                  {/* Fallback */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
              <LegalFooter />
            </Router>
          </DarkModeProvider>
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
