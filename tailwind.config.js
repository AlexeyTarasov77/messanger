/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                border: "#7D88AA",
                bgLight:"#77B5BF"
            },
        },
    },
    plugins: [],
};
