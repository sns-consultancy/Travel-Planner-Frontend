import React, { useState } from "react";
import "./AIChatbot.css";
const appLinks = [
  { name: "GingerTips", url: "/gingertips" },
  { name: "OneDoctor", url: "/onedoctor" },
  { name: "LifeSync", url: "/lifesync" },
  { name: "TravelPlanner", url: "/travelplanner" },
  { name: "MoneyMatters", url: "/moneymatters" },
  { name: "EduMentor", url: "/edumentor" },
  { name: "FitNest", url: "/fitnest" },
  { name: "HomeGenie", url: "/homegenie" },
  { name: "LegalAid", url: "/legalaid" },
  { name: "Investify", url: "/investify" }
];
export default function AIChatbot() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { text: input, from: "user" }]);
    setLoading(true);
    setInput("");
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...messages.map(m => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text
            })),
            { role: "user", content: input }
          ]
        })
      });
      const data = await res.json();
      const reply = data.choices[0].message.content.trim();
      setMessages(prev => [...prev, { text: reply, from: "bot" }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "Error getting response.", from: "bot" }]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">:brain: AI Chatbot</h2>
      {/* App Navigation */}
      <div className="app-navigation">
        {appLinks.map(app => (
          <a key={app.name} href={app.url} className="app-link" target="_blank" rel="noopener noreferrer">
            {app.name}
          </a>
        ))}
      </div>
      {/* Chat Messages */}
      <div className="chatbot-messages">
        {messages.map((m, i) => (
          <div key={i} className="chatbot-message">
            <b>{m.from === "user" ? "You" : "Bot"}:</b> {m.text}
          </div>
        ))}
      </div>
      {/* Input Section */}
      <div className="chatbot-input-row">
        <input
          className="chatbot-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={e => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button className="chatbot-button" onClick={sendMessage} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}