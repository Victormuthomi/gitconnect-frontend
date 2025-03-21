#!/bin/bash

# Directories to create
directories=(
  "src/assets"
  "src/components"
  "src/context"
  "src/hooks"
  "src/layouts"
  "src/pages"
  "src/routes"
  "src/services"
  "src/styles"
  "src/utils"
)

# Files to create
files=(
  "src/App.jsx"
  "src/main.jsx"
  "src/context/AuthContext.jsx"
  "src/context/ThemeContext.jsx"
  "src/routes/index.jsx"
  "src/services/api.js"
  "src/styles/globals.css"
  "tailwind.config.js"
  ".eslintrc.json"
)

# Create directories
for dir in "${directories[@]}"; do
  mkdir -p "$dir"
done

# Create files
for file in "${files[@]}"; do
  touch "$file"
done

# Initialize Tailwind config
echo 'module.exports = { content: ["./index.html", "./src/**/*.{js,jsx}"], theme: { extend: {} }, plugins: [], darkMode: "media" }' > tailwind.config.js

# Add global styles
echo '@tailwind base;\n@tailwind components;\n@tailwind utilities;' > src/styles/globals.css

# Setup ESLint config
echo '{ "extends": "react-app", "rules": { "react/prop-types": "off" } }' > .eslintrc.json

echo "✅ Project structure set up successfully!"

