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
        button: "#312244",
        buttonHover: "#4d356b",
      },
    },
  },
  plugins: [],
};
