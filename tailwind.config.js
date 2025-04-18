import lineClamp from "@tailwindcss/line-clamp";
import animate from "tailwind-animate";

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "948px",
        xl: "1272px",
      },
    },
    extend: {},
  },
  plugins: [lineClamp, animate],
};
