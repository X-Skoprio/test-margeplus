const { BiCode } = require("react-icons/bi");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        '0': '0px',
        '100': '100px',
      },
      borderWidth: {
        '100': '100px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily : {
        poppins: ['Poppins', 'sans-serif'],
        moontime : ['Moon Time', 'sans-serif']
      },
      colors: {
        primary : '#A52502',
        secondary : '#0f0f0f',
        darkColor : '#0f0f0f',
      },
      container : {
        center : true,
        padding : {
          default : '1rem',
          sm : '3rem',
        }
      },
      animation: {
        spin: 'spin 5s linear infinite',
        'left-right': 'leftRight 2s linear infinite',
        'bg-opacity': 'bg-opacity 1s infinite',
        'scale-up-down': 'scale-up-down 2s infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        leftRight: {
          '0%': { transform: 'translateX(-5px)' },
          '25%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-5px)' },
        },
        'bg-opacity': {
          '0%': { backgroundColor: 'rgba(255, 0, 0, 0.7)' },
          '50%': { backgroundColor: 'rgba(255, 0, 0, 1)' },
          '100%': { backgroundColor: 'rgba(255, 0, 0, 0.7)' },
        },
        'scale-up-down': {
          '0%, 100%': { transform: 'scale(1)', backfaceVisibility: 'hidden' },
          '50%': { transform: 'scale(1.03)', backfaceVisibility: 'hidden' },
        }
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
