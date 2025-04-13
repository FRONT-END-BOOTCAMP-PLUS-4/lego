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
    // extend: {
    //   colors: {
    //     "blue-01": "var(--blue-01)",
    //     "blue-02": "var(--blue-02)",
    //     "blue-03": "var(--blue-03)",
    //     "blue-04": "var(--blue-04)",
    //     "blue-04": "#f7f8fc",
    //     "gray-01": "var(--gray-01)",
    //     "gray-02": "var(--gray-02)",
    //     black: "var(--black)",
    //     white: "var(--white)",
    //   },
    // },
  },
  plugins: [],
};
