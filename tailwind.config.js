/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensures Tailwind scans your React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#1E3A8A",
        accent: "#3B82F6",
        background: "#F9FAFB",
        muted: "#6B7280",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
    },
  },
  plugins: [],
};
