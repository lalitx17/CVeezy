/** @type {import('tailwindcss').Config} */


export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: '320px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      colors: {
        primaryBackground: "#1F1F2E", // Darker background color
        secondaryBackground: "#28293D", // Slightly lighter dark background
        button: "#3E3E5D", // Dark button color
        buttonFocus: "#5B5B86", // Lighter button focus color
        blueG: "#4A90E2", // Softer blue color for better contrast
        textPrimary: "#E1E1E6", // Light text color for readability
        textSecondary: "#B0B0B6", // Slightly dimmed text for secondary information
        borderColor: "#3D3D4C", // Border color for input fields and dividers
      },
      fontFamily: {
        primary: ["'Lato'", 'sans-serif'],
        complementary: ["'Roboto'", 'sans-serif'],
        white: ["'Josefin Sans'", 'sans-serif'],
        secondary: ["'Poppins'", 'sans-serif'],
        montser: ["'Montserrat'", 'sans-serif'],
      },
      animation: {
        'drop-fade': 'dropFade 0.75s ease-in forwards',
      },
      keyframes: {
        dropFade: {
          '0%': {
            transform: 'translateY(-20px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0px)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
