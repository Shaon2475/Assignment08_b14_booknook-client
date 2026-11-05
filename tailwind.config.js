module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: { fontFamily: { sans: ["Poppins", "sans-serif"], display: ["Poppins", "sans-serif"] } } },
  plugins: [require("daisyui")],
  daisyui: { themes: [
    { light: { primary: "#1F6F54", "primary-content": "#FFFFFF", secondary: "#B45309", accent: "#F59E0B", "accent-content": "#1F2937",
      neutral: "#1F2937", "base-100": "#FFFFFF", "base-200": "#F3F4F6", "base-300": "#E5E7EB", "base-content": "#1F2937", "--rounded-btn": "0.5rem" } },
    { dark: { primary: "#34D399", "primary-content": "#052E1F", secondary: "#FBBF24", accent: "#F59E0B", "accent-content": "#1F2937",
      neutral: "#111827", "base-100": "#1F2937", "base-200": "#111827", "base-300": "#374151", "base-content": "#F3F4F6", "--rounded-btn": "0.5rem" } } ] },
};
