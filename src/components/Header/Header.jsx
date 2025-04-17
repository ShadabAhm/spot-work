import React from "react";
import { Link } from "react-router-dom";

export default function Header({ toggleSidebar, isSidebarOpen }) {
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <header className="shadow sticky z-50 top-0 transition-all duration-300">
            <nav className={`bg-white border-gray-200 h-[70px] max-h-[200px] px-2 ${isSidebarOpen ? 'py-3' : 'py-0'}`}>
                <div className="flex flex-wrap justify-between items-center mx-auto">

                    {/* Reserve space but hide content when sidebar is open */}
                    <div className="flex items-center space-x-3 w-[200px] gap-6 ml-2">
                        {!isSidebarOpen ? (
                            <>
                                <Link to="/" className="flex items-center">
                                    <img
                                        src="/assets/images/irachat-logo.png"
                                        className="h-[74px] w-[300px]"
                                        alt="Logo"
                                    />
                                </Link>
                                <button
                                    onClick={toggleSidebar}
                                    className="text-gray-800 text-2xl font- bg-gray-100 hover:bg-blue-100 rounded-full px-2 py-1 transition-colors duration-200"
                                >
                                    ☰
                                </button>
                            </>
                        ) : (
                            // Empty divs to preserve space
                            <>
                                <div className="h-12 w-[100px]"></div>
                                <div className="w-[40px]"></div>
                            </>
                        )}
                    </div>

                    {/* Right side buttons stay fixed on the right */}
                    <div className="flex items-center lg:order-2">
                        <button
                            onClick={handleLogout}
                            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 transition-colors duration-200"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
}
