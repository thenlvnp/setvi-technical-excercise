/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#6188FF",
                    secondary: "#292D3F",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
