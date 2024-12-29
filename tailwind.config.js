/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      "colors": {
        "background": "#1c1c1c",
        "text": "#ffffff",
        "primary": {
          "default": "#6900cc",
          "hover": "#7900d9",
          "active": "#8900e6",
          "disabled": "#9900f3"
        },
        "secondary": {
          "default": "#c4a300",
          "hover": "#d4b300",
          "active": "#e4c300",
          "disabled": "#f4d300"
        },
        "border": "#454545",
        "error": "#ff0000",
        "success": "#00ff00",
        "warning": "#ffff00",
        "info": "#0000ff"
      },
      "spacing": {
        "1": "0.25rem",
        "2": "0.5rem",
        "3": "0.75rem",
        "4": "1rem",
        "5": "1.25rem",
        "6": "1.5rem",
        "7": "1.75rem",
        "8": "2rem"
      },
      "fontSize": {
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem"
      },
      "screens": {
        "sm": "640px",
        "md": "768px",
        "lg": "1024px",
        "xl": "1280px",
        "2xl": "1536px"
      }
    }
  },
  plugins: [],
}


