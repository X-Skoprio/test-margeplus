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
      boxShadow: {
        'inner-custom': 'inset 0 2px 4px 0 rgba(2, 0, 0, 0.1)',
        // Add other custom inner shadows here if needed
      },
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
        primary : '#02A3CD',
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
      colors: {
            "border": "hsl(var(--border))",
            "input": "hsl(var(--input))",
            "ring": "hsl(var(--ring))",
            "background": "hsl(var(--background))",
            "foreground": "hsl(var(--foreground))",
            "primary": {
              "DEFAULT": "hsl(var(--primary))",
              "foreground": "hsl(var(--primary-foreground))"
            },
            "secondary": {
              "DEFAULT": "hsl(var(--secondary))",
              "foreground": "hsl(var(--secondary-foreground))"
            },
            "destructive": {
              "DEFAULT": "hsl(var(--destructive))",
              "foreground": "hsl(var(--destructive-foreground))"
            },
            "muted": {
              "DEFAULT": "hsl(var(--muted))",
              "foreground": "hsl(var(--muted-foreground))"
            },
            "accent": {
              "DEFAULT": "hsl(var(--accent))",
              "foreground": "hsl(var(--accent-foreground))"
            },
            "popover": {
              "DEFAULT": "hsl(var(--popover))",
              "foreground": "hsl(var(--popover-foreground))"
            },
            "card": {
              "DEFAULT": "hsl(var(--card))",
              "foreground": "hsl(var(--card-foreground))"
            }
          },
      borderRadius: {
            "lg": "var(--radius)",
            "md": "calc(var(--radius) - 2px)",
            "sm": "calc(var(--radius) - 4px)"
          },
      keyframes: {
            "accordion-down": {
              "from": {
                "height": "0"
              },
              "to": {
                "height": "var(--radix-accordion-content-height)"
              }
            },
            "accordion-up": {
              "from": {
                "height": "var(--radix-accordion-content-height)"
              },
              "to": {
                "height": "0"
              }
            }
          }
},
  plugins: [require("tailwind-scrollbar"), require("tailwindcss-animate")],
};
