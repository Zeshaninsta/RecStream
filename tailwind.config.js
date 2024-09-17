/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sedan': ['Sedan SC', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'teko': ['Teko', 'sans-serif'],
        'pro': ['Protest Strike', 'sans-serif'],
        'jet': ['JetBrains Mono', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'rubik': ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
