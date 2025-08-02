import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Mic, Languages, Volume2, VolumeX, Image } from "lucide-react";
import "./FloatingChatBot.css";

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

export default function FloatingChatBot({ context = {}, summary = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");
  const [speak, setSpeak] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!speak) return;
    const last = messages[messages.length - 1];
    if (last && last.from === "bot") {
      const utter = new SpeechSynthesisUtterance(last.text);
      utter.lang = lang;
      window.speechSynthesis.speak(utter);
    }
  }, [messages, speak, lang]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const updatedMessages = [...messages, { text: input, from: "user" }];
    setMessages(updatedMessages);
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
            { role: "system", content: `You are a helpful assistant. Language: ${lang}` },
            ...updatedMessages.map(m => ({
              role: m.from === "user" ? "user" : "assistant",
              content: m.text
            })),
            {
              role: "user",
              content: `${input}\n\nContext: ${JSON.stringify(context)}\n\nSummary: ${summary}`
            }
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

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.lang = lang;
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech error:", event.error);
      };

      recognitionRef.current = recognition;
    }

    recognitionRef.current.start();
  };

  const loadTesseract = () => {
    if (window.Tesseract) return Promise.resolve(window.Tesseract);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/tesseract.js@4.0.2/dist/tesseract.min.js";
      script.onload = () => resolve(window.Tesseract);
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const handleOCRClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const Tesseract = await loadTesseract();
      const { data: { text } } = await Tesseract.recognize(file, lang);
      setInput(text.trim());
    } catch (err) {
      console.error("OCR error", err);
      alert("OCR failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg"
      >
        <MessageCircle size={24} />
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[350px] h-[500px] z-40 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-300 flex flex-col">
          <div className="chatbot-container">
            <h2 className="chatbot-title">🧠 AI Chatbot</h2>

            <div className="flex justify-center items-center gap-2 mb-2">
              <Languages size={16} />
              <select
                value={lang}
                onChange={e => setLang(e.target.value)}
                className="border px-2 py-1 rounded text-sm"
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="ta">Tamil</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>

            <div className="app-navigation">
              {appLinks.map(app => (
                <a
                  key={app.name}
                  href={app.url}
                  className="app-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {app.name}
                </a>
              ))}
            </div>

            <div className="chatbot-messages">
              {messages.map((m, i) => (
                <div key={i} className="chatbot-message">
                  <b>{m.from === "user" ? "You" : "Bot"}:</b> {m.text}
                </div>
              ))}
            </div>

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
              <button onClick={handleVoiceInput} className="chatbot-button" title="Voice Input">
                <Mic size={16} />
              </button>
              <button onClick={handleOCRClick} className="chatbot-button" title="OCR from image">
                <Image size={16} />
              </button>
              <button
                onClick={() => setSpeak(s => !s)}
                className={`chatbot-button ${speak ? "active" : ""}`}
                title="Toggle speech"
              >
                {speak ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <button
                className="chatbot-button"
                onClick={sendMessage}
                disabled={loading}
              >
                {loading ? "..." : "Send"}
              </button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
        </div>
      )}
    </>
  );
}
