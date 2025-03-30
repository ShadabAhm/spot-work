import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/Header/Header";


const AppLayout = () => {
  return (
    <div className="app-layout flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Page Content */}
        <main className="flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
