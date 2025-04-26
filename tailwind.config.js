/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            // example
            // gradientColors:{
            //     top: "#77B5BF",
            //     bottom: "#7D88AA"
            // }
            colors: {
                border: "#77B5BF",
            },
        },
    },
    plugins: [],
};
