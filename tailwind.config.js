/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#5B3DF5",
        primarySoft: "#EAE6FF",
        bgSoft: "#F5F6FF",
        card: "#FFFFFF",
        borderSoft: "#E4E7FF",
        textMuted: "#7A7FB3",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(91,61,245,0.15)",
        insetSoft: "inset 0 2px 6px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
    },
  },
  plugins: [],
};
