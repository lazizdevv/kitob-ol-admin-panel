/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#CDCDCD",
        dark:"#2C3033",
        accent:"#F5F5F6"
      }
    },
  },
  plugins: [],
}