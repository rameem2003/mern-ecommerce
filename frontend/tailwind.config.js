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

      boxShadow: {
        customOne: "0px 1px 13px 0px rgba(0, 0, 0, 0.05)",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
