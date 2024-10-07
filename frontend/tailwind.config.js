/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        container: "1170px",
      },

      backgroundImage: {
        bgScreen: "url(/bg1.jpg)",
      },

      colors: {
        primaryRed: "#DB4444",
        secondaryRed: "#E07575",
        primaryGrey: "#363738",
        secondaryGrey: "#7D8184",
        whiteShadeOne: "#F5F5F5",
        whiteShadeTwo: "#FEFAF1",
        whiteShadeThree: "#FAFAFA",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
