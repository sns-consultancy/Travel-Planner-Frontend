import React from "react";
import { Link } from "react-router-dom";

export default function LegalFooter() {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 text-center py-2 text-sm text-gray-600 z-40">
      <p className="px-4">
        © {new Date().getFullYear()} TravelPlanner. All rights reserved. &nbsp;
        <Link to="/terms" className="text-blue-600 hover:underline">Terms</Link> |{" "}
        <Link to="/privacy" className="text-blue-600 hover:underline">Privacy</Link> |{" "}
        <Link to="/disclaimer" className="text-blue-600 hover:underline">Disclaimer</Link>
      </p>
    </footer>
  );
}