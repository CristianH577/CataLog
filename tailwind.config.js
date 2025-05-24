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
          DEFAULT: "#1E88E5",
          1: "#90CAF9",
          2: "#1565C0",
        },
        secondary: {
          DEFAULT: "#43A047",
          1: "#A5D6A7",
          2: "#2E7D32",
        },
        tertiary: {
          DEFAULT: "#E0E0E0",
          1: "#FAFAFA",
          2: "#BDBDBD",
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
