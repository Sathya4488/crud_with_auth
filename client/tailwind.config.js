module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ".src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        GoogleSans: "'Google Sans', sans-serif",
        Poppins: "'Poppins', sans-serif",
      },
      backgroundImage: {
        character: "url('/src/assets/images/books-5937823_1280.jpg')",
      },
    },
    screens: {
      sm: "640px", // Small screens and up
      // other breakpoints
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
