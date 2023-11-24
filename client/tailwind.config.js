/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Configure your color palette here
        themeBlue: "#0f7491",
      },
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
        roboto: ["Roboto", "sans-serif"],
        workSans: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
