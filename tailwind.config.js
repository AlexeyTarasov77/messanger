/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                bgLightOne: "#7D88AA",
                bgLight:"#77B5BF",
                bgDark:"#1C1F26",
                text: "#543C52"
            },
        },
    },
    plugins: [],
};
