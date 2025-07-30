import React from "react";

export default function OneDoctor() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>🩺 OneDoctor</h2>
      <p>
        Welcome to <strong>OneDoctor</strong> — explore its unique features and capabilities.
      </p>
      <ul style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <li>🔗 Centralized access through TravelPlanner</li>
        <li>🧠 Powered by AI integrations</li>
        <li>🔒 Secure and optimized for cross-app data</li>
      </ul>
      <a
        href="https://onedoctor.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Launch OneDoctor →
      </a>
    </div>
  );
}
