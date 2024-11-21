module.exports = {
  content: ["./**/*.{html,js}"], // This includes all HTML files in the project
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.2)", opacity: "0.8" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        bounceIn: "bounceIn 0.5s ease-out",
        fadeOut: "fadeOut 1s ease-out forwards",
      },
    },
  },
};