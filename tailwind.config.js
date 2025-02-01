/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FFFEFC',
        beige: {
          primary: '#EBD8CB',
          secondary: '#F1E3D9',
          tertiary: '#FDF4ED',
        },
        brown: {
          primary: '#613E29',
          secondary: '#BC8462',
          tertiary: '#DEBBA3',
          quaternary: '#9C6C4F',
        },
        pink: '#FF80A6',
        gray: '#A5A5A5',
        placeholder: '#E8DCCB',
      },
    },
  },
  plugins: [],
};
