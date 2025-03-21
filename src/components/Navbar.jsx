import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMenuOpen(false); // Close menu on small screens
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Home Link - Redirects based on login state */}
        <Link
          to={isLoggedIn ? "/dashboard" : "/"}
          className="text-xl font-bold"
        >
          GitConnect
        </Link>

        {/* Hamburger Menu Button (Small Screens) */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu - Shows normally on large screens, toggles on small screens */}
        <div
          className={`absolute md:relative bg-gray-800 w-full md:w-auto left-0 top-14 md:top-0 md:flex md:space-x-4 p-4 md:p-0 ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <Link
            to={isLoggedIn ? "/dashboard" : "/"}
            className="block md:inline hover:underline py-2 md:py-0"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="block md:inline hover:underline py-2 md:py-0"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block md:inline hover:underline py-2 md:py-0"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block md:inline hover:underline py-2 md:py-0"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block md:inline bg-red-500 px-3 py-1 rounded hover:bg-red-700 text-white mt-2 md:mt-0"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

