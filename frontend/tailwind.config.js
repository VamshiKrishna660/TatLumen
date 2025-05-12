/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // adjust based on your project structure
  ],
  theme: {
    extend: {
      animation: {
        "star-movement-bottom":
          "star-movement-bottom linear infinite alternate",
        "star-movement-top": "star-movement-top linear infinite alternate",
      },
      keyframes: {
        "star-movement-bottom": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(-100%, 0%)", opacity: "0" },
        },
        "star-movement-top": {
          "0%": { transform: "translate(0%, 0%)", opacity: "1" },
          "100%": { transform: "translate(100%, 0%)", opacity: "0" },
        },
      },
      colors: {
        dark: "#222831",
        charcoal: "#393E46",
        olive: "#948979",
        sand: "#DFD0B8",
      },
    },
  },
  plugins: [],
};
