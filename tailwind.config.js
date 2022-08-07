/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#241932",
        second: "#519643",
        header: "#fafafa",
        github: "#333333",
        githubHover: "#111111",
        button: "#4d356b",
        buttonHover: "#312244",
      },
    },
    screens: {
      maxxs: { raw: "(max-width: 420px)" },
      sm: "576px",
      maxsm: { raw: "(max-width: 576px)" },
      // => @media (min-width: 576px) { ... }

      md: "960px",
      // => @media (min-width: 960px) { ... }

      lg: "1440px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
