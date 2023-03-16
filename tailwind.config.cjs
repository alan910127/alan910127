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
        main: ["var(--font-main)", ...fontFamily.sans],
        elevator: ["var(--font-elevator)", ...fontFamily.mono],
      },
    },
  },
  plugins: [],
};

module.exports = config;
