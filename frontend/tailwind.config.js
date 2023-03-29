/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        inner: 'inset 0 -0.3rem 0 0 #00000020'
      },
      boxShadowColor: {
        insetPopupColor: '#000000'
      }
    },
  },
  plugins: [],
};
