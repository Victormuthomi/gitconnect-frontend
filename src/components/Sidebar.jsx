import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-screen bg-gray-800 text-white transition-all ${collapsed ? "w-16" : "w-64"}`}
    >
      <button
        className="p-2 text-white hover:bg-gray-700 w-full text-left"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? "☰" : "Collapse"}
      </button>
      <nav className="mt-4">
        <ul>
          <li className="p-3 hover:bg-gray-700">
            <Link to="/dashboard">Feed</Link>
          </li>
          <li className="p-3 hover:bg-gray-700">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="p-3 hover:bg-gray-700">
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
