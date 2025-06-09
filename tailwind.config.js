/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                border: "#CDCED2",
                grey: "#81818D",
                mainBg: "#FAF8FF",
                slive: "#543C52",
                darkBlue: "#070A1C",
                sliveLight:"#E9E5EE"
            },
            fontFamily: {
                main: "GT Walsheim Pro"
            }
        },
    },
    plugins: [],
};
