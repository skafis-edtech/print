// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Include your TypeScript files
  ],
  theme: {
    extend: {}, // You can extend the default Tailwind theme here
  },
  plugins: [],
};
