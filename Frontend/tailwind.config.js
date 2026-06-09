/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        // Brand Colors
        primary: "#2E7D32",
        primaryDark: "#1B5E20",
        primaryLight: "#66BB6A",

        // Accent Colors
        accent: "#FB8C00",
        accentYellow: "#FFD54F",

        // Background Colors
        background: "#F5F5F5",
        surface: "#FFFFFF",

        // Text Colors
        textPrimary: "#212121",
        textSecondary: "#616161",

        // Border Colors
        border: "#E0E0E0",

        // Status Colors
        success: "#4CAF50",
        error: "#E53935",
        warning: "#FFA000",
        info: "#2196F3",
      },

      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },

      boxShadow: {
        soft: "0 2px 10px rgba(0,0,0,0.08)",
        medium: "0 4px 20px rgba(0,0,0,0.12)",
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      backgroundImage: {
        primaryGradient: "linear-gradient(135deg, #2E7D32, #66BB6A)",

        offerGradient: "linear-gradient(135deg, #FB8C00, #FFD54F)",
      },
    },
  },

  plugins: [],
};
