/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".image-blue500": {
          filter:
            "   invert(79%) sepia(34%) saturate(688%) hue-rotate(197deg) brightness(96%) contrast(101%);",
        },
      });
    },
  ],
};
