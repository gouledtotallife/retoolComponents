/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '.retool-custom-component', // Add this line
  theme: {
    extend: {
      colors: {
        coral: '#FF6B6B',
        background: '#f5f5f5'
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}