/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Noto Sans SC', 'sans-serif'],
      },
      colors: {
        primary: '#2C5AA0',
        'primary-hover': '#1d4588',
      }
    },
  },
  plugins: [],
}






