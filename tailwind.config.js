/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme.js';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,css}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['TarzanaWideBold', 'InterVariable', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
