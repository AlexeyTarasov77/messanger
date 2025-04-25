/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        logo: ["CustomFont", "inter"],
        header: ["CustomFont", "hind"],
      },
      dropShadow: {
        banner: [
          "0 5px 5px rgba(216, 186, 13, 0.78)",
          "0 4px 15px rgba(194, 16, 105, 0.6)",
        ],
        shadowYellow: [
          "0 0.1px 1px rgba(216, 186, 13, 0.78)",
          "0 3px 3px rgba(216, 186, 13, 0.78)",
        ],
      },
    },
  },
  plugins: [],
}

