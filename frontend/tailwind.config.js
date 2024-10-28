/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary_bg: "#1f1f2f",
      primary_text: "#fff",
      secondary_text: "#aaa",
      focus_text: "#1a202c",
      background: "#f4f4f4",
      background_gray: "#222430",
      navbar_border_color: "rgba(255, 255, 255, 0.2)",
      name_background: "#222430",
      country_background: "#2E313F",
      organizer_background: "#404357",
      confirm_background: "#181A24",
      event_text: "#8B90B2",
      green_text: "#70C116",
      blue_text: "#4CA6D9",
      custom_red: "#ED4337",
      black: "#151515",
      blue: {
        500: "#3b82f6",
        600: "#2563eb",
      },
      gray: {
        900: "#111827",
        800: "#1f2937",
        700: "#374151",
        500: "#595959",
        400: "#cbd5e1",
        300: "#d1d5db",
      },
    },
  },
  plugins: [],
};
