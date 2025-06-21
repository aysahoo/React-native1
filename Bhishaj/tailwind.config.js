/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'primary': '#799dfe',
        
      },
      fontFamily: {
        'fraunces': ["Fraunces-VariableFont_SOFT,WONK,opsz,wght"],
        'fraunces-italic': ["Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght"],
        'space-mono': ["SpaceMono-Regular"],
      }
    },
  },
  plugins: [],
}