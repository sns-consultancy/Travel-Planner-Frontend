import React from "react";

export default function EduMentor() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>📚 EduMentor</h2>
      <p>
        Welcome to <strong>EduMentor</strong> — explore its unique features and capabilities.
      </p>
      <ul style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <li>🎯 Track learning goals</li>
        <li>🧠 Get subject-specific AI tutoring</li>
        <li>📅 Manage study plans</li>
        <li>💡 Ask GPT-based questions</li>
      </ul>
      <a
        href="https://edumentor.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Launch EduMentor →
      </a>
    </div>
  );
}
