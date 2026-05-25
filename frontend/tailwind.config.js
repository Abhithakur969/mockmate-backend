/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', "sans-serif"],
        body: ['"DM Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        coal: "#080808",
        surface: "#111111",
        "surface-2": "#191919",
        "surface-3": "#222222",
        border: "#272727",
        "border-2": "#363636",
        amber: "#F5A623",
        "amber-glow": "#FFB93A",
        muted: "#505050",
        subtle: "#333333",
        light: "#A8A8A8",
        snow: "#F0F0F0",
        green: "#22C55E",
        "green-dim": "#14532D",
        "green-bg": "#020D06",
        red: "#EF4444",
        "red-dim": "#7F1D1D",
        "red-bg": "#120202",
        yellow: "#EAB308",
        "yellow-dim": "#713F12",
        "yellow-bg": "#0C0800",
      },
    },
  },
  plugins: [],
};
