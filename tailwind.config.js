/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // if you change any colors here, update it in /utils as well
      colors: {
        white: "#fdefef",
        black: "#333",
        primary: "#55f", //blue
        primaryLight: "#99f", // blue
        secondary: "#381", // green
        secondaryLight: "#aea", // green
        tertiary: "#967bb6", // lavender
        tertiaryLight: "#e6e6fa", // lavender
        quatenary: "#f55", // red
        quatenaryLight: "#f99", // red
        default: "#222020", // dark
        defaultLight: "#bbb", //
      },
      dropShadow: {
        light: "-2px -2px 5px rgba(0, 0, 0, 0.3)",
        dark: [
          "-3px -3px 12px rgba(255, 255, 255, 0.5)",
          // "0px 0px 10px rgba(200, 200, 200, 0.5)",
        ],
      },
      fontFamily: {
        gothic: ["Didact Gothic", "sans-serif"],
      },
    },
    screens: {
      mobile: "480px",
      tablet: "640px",
      laptop: "1024px",
      desktop: "1280px",
    },
    animation: {
      "spin-slow": "spin 3s linear infinite",
    },
  },
  plugins: [],
};
