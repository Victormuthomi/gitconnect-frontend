import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiSettings,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
} from "react-icons/fi";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Poll localStorage every 500ms for changes in login status.
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div
      className={`h-screen bg-gray-900 text-white transition-all flex flex-col fixed left-0 top-0 ${
        collapsed ? "w-16" : "w-64"
      } md:w-64 sm:w-full duration-300 shadow-lg z-10`}
    >
      {/* Logo */}
      <div className="p-3 flex items-center justify-center">
        <Link
          to={isLoggedIn ? "/dashboard" : "/landing"}
          className="text-xl font-bold text-white"
        >
          GitConnect
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        className="p-3 flex items-center justify-center hover:bg-gray-700"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
      </button>

      {/* Navigation Links */}
      <nav className="mt-4 flex-1">
        <ul className="space-y-2">
          {/* Home Button */}
          <li>
            <Link
              to={isLoggedIn ? "/dashboard" : "/landing"}
              className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
            >
              <FiHome size={20} />
              {!collapsed && <span className="ml-3">Home</span>}
            </Link>
          </li>

          {isLoggedIn ? (
            <>
              {/* Dashboard Link */}
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
                >
                  <FiHome size={20} />
                  {!collapsed && <span className="ml-3">Dashboard</span>}
                </Link>
              </li>

              {/* Profile Link */}
              <li>
                <Link
                  to="/profile"
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
                >
                  <FiUser size={20} />
                  {!collapsed && <span className="ml-3">My Profile</span>}
                </Link>
              </li>

              {/* All Profiles Link */}
              <li>
                <Link
                  to="/profiles"
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
                >
                  <FiUsers size={20} />
                  {!collapsed && <span className="ml-3">All Profiles</span>}
                </Link>
              </li>

              {/* Settings Link */}
              <li>
                <Link
                  to="/profile/edit"
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
                >
                  <FiSettings size={20} />
                  {!collapsed && <span className="ml-3">Settings</span>}
                </Link>
              </li>

              {/* Logout Button */}
              <li>
                <button
                  onClick={handleLogout}
                  className="flex items-center p-3 hover:bg-red-700 rounded-md transition w-full"
                >
                  <FiHome size={20} />
                  {!collapsed && <span className="ml-3">Logout</span>}
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Login Link */}
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
                >
                  <FiUser size={20} />
                  {!collapsed && <span className="ml-3">Login</span>}
                </Link>
              </li>

              {/* Register Link */}
              <li>
                <Link
                  to="/register"
                  className="flex items-center p-3 hover:bg-gray-700 rounded-md transition"
                >
                  <FiUser size={20} />
                  {!collapsed && <span className="ml-3">Register</span>}
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
