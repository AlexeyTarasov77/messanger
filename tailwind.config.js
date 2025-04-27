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
      ThemeGradient: {
        top: "#77B5BF",
        bottom: "#7D88AA",
      },
      ThemeGradientDark: {
        top: "#3E4148",
        bottom: "#1B1E25",
      },
      colors: {
        textColor: "#FFFFFF",
        colorsMain: '#77B5BF',

        border: "#7D88AA",
        borderDark: "#666666",

        shadow: "#7D88AA",
        shadowDark: "#77B5BF",
        // #77B5BF
      }
    },
  },
  plugins: [],
}
