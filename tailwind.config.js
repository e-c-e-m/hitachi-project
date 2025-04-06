/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Blue
        lightBlue: "#DFF5FF",
        darkBlue: "#243746",

        // Grey
        greyC5: "#C5C5C5",

        // Green
        sageGreen: "#B1CFD4",
        lightGreen: "#E6FAEC",

        // Orange
        lightOrange: "#EEA990",
      },
      fontFamily: {
        petrona: ["Petrona", "serif"],
        albert: ["Albert Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
