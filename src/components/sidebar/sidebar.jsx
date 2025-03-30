import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul>
        <li className="mb-2">
          <Link to="/home" className="block p-2 hover:bg-gray-700">
            Home
          </Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </aside>
  );
};

export default Sidebar;
