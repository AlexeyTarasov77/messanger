/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        gradientColors:{
            top: "#77B5BF",
            bottom: "#7D88AA"
        }
    },
  },
  plugins: [],
}

