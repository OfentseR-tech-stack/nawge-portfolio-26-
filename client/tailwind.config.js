/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#111111",
        bg2: "#1A1A1A",
        accent: "#FFFFFF",
        muted: "#999999",
        action: "#F44336",
      },
      fontFamily: {
        heading: ["Bebas Neue", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        alt: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
}
