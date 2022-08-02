/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        blur: "url(/src/assets/img/background.png)",
      },
      fontFamily: {
        sans: "Ruda, sans serif",
      },
      colors: {
        gray: {
          100: "#d7d7d7",
        },
        white: "#fdffff",
        red: {
          500: "#ef3e36",
        },
        gray: {
          900: "#28282a",
        },
      },
    },
  },
  plugins: [],
};
