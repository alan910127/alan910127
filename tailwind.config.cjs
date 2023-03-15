/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        content: "#fcfcf2",
        elevator: "#b2c5d6",
      },
      fontFamily: {
        inter: ["var(--font-inter)", ...fontFamily.sans],
        elevator: ["var(--font-electrolize)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};

module.exports = config;
