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

        {/* Hamburger Menu Button (Visible on Small Screens) */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Menu - Shows normally on large screens, toggles on small screens */}
        <div className={`md:flex space-x-4 ${menuOpen ? "block" : "hidden"} md:block`}>
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="hover:underline">
            Home
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="hover:underline">Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
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

