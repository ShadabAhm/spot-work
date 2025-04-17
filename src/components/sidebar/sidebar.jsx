// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ toggleSidebar }) => {
  return (
    <aside className="w-64 bg-white text-gray-700 flex flex-col min-h-screen transition-all duration-300 ease-in-out">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-[70px] max-h-[200px] px-2 border-b border-gray-300 bg-white py-2 mr-1">
        <img src="/assets/images/irachat-logo.png" className="h-[80px] w-[200px]" alt="Logo" />
        <button
          onClick={toggleSidebar}
          className="text-gray-700 font-bold hover:text-orange-300 text-2xl rounded-full px-2 py-1 ml-1 transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      {/* Sidebar Links */}
      <ul className="p-5">
        <li className="mb-2">
          <Link to="/home" className="block p-2 hover:bg-gray-100 rounded transition-colors duration-200">
            Home
          </Link>
        </li>
        {/* Add more links here */}
      </ul>
    </aside>
  );
};

export default Sidebar;