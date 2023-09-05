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
      colors: {
        primary: "#222020",
        secondary: "#08b085",
        secondaryLight: "#08b08530"
      },
      dropShadow: {
        light: "-2px -2px 5px rgba(0, 0, 0, 0.3)",
        dark: [
          "-3px -3px 12px rgba(255, 255, 255, 0.5)",
          // "0px 0px 10px rgba(200, 200, 200, 0.5)",
        ],
      },
      fontFamily: {
        gothic: ['Didact Gothic', 'sans-serif']
      }
    },
  },
  plugins: [],
};
