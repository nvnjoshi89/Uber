/** @type {import('tailwindcss').Config} */

// "./src/"
// Look inside the src folder in your project root.

// "**/"
// The double asterisk means “look inside all subfolders recursively” — it will include files in src/, src/components/, src/pages/, etc.

// "*.{js,ts,jsx,tsx}"
// This means any file with these extensions:
module.exports = {
  content: [
    "./index.html",            // for root HTML
    "./src/**/*.{js,ts,jsx,tsx}" // all JS/TS/React files inside src/
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


