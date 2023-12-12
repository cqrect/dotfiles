/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["JetBrainsMono Nerd Font"],
    },
    extend: {
      letterSpacing: {
        widest: "1rem",
      },
      dropShadow: {
        title: ".1rem .1rem .3rem #e879f990",
      },
    },
  },
  plugins: [],
};
