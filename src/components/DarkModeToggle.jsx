import { useEffect, useState } from "react";

function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-700 text-white rounded-lg"
    >
      {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default DarkModeToggle;
