/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        xs: "360px",
      },
      colors: {
        primary: {
          DEFAULT: "#5EA2EF",
          1: "#0072F5",
        },
        secondary: {
          DEFAULT: "#FFB457",
          1: "#FF705B",
        },
      },
      shadow: {
        custom: "0px 0px 10px var(--tw-shadow-color)",
      },
    },
  },
  themes: {},
  darkMode: "class",
  important: true,
  plugins: [
    require("tailwind-scrollbar")({
      nocompatible: true,
      preferredStrategy: "pseudoelements",
    }),
  ],
};
