import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Header({ toggleSidebar, isSidebarOpen }) {
    const [myActivePlan, setMyActivePlan] = useState(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    useEffect(() => {
        getMyActiveSubscription();
        getUserProfile();
    }, []);

    const getMyActiveSubscription = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("https://bknd.ira.chat/api/subscriptions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            sessionStorage.setItem("SUBCRIPTIONS", JSON.stringify(response.data));
            setMyActivePlan(response.data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.error?.message || 'Failed to Fetch Active Plan.');
            setIsLoading(false);
        }
    };

    const getUserProfile = async () => {
        try {
            const token = sessionStorage.getItem("token");
            const response = await axios.get("https://bknd.ira.chat/api/users/me?populate=*", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUserProfile(response.data);
        } catch (error) {
            toast.error("Failed to fetch user profile");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("SUBCRIPTIONS");
        window.location.href = "/login";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
                    <div className="flex items-center lg:order-2 gap-2 mr-2">
                        {/* Plan Display */}
                        <div className="relative group shrink-0 inline-block">
                            <div className="mr-2">
                                <button
                                    type="button"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                    className="font-bold px-2 py-1 hover:text-white hover:bg-[#E27F34] text-[#E27F34] text-md border border-[#E27F34] rounded-lg"
                                >
                                    {isLoading ? "Loading..." : (myActivePlan ? myActivePlan.plan?.name : "Expired")}
                                </button>
                            </div>

                            {/* Plan Card */}
                            {myActivePlan && (
                                <div
                                    className={`absolute left-1/2 top-full mt-2 h-auto min-w-[150px] max-w-[250px] bg-white border border-[#E27F34] -translate-x-1/2 p-6 rounded-lg shadow-lg transition-all duration-300 z-50 ${isHovered ? "visible opacity-100" : "invisible opacity-0"
                                        }`}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="text-lg font-semibold text-black">Your Plan</div>
                                        <h3 className="mt-2 text-2xl text-[#E27F34] font-bold">
                                            {myActivePlan.plan?.name}
                                        </h3>
                                        <h5 className="mt-4">Expiry</h5>
                                        <h5>{formatDate(myActivePlan.endDate)}</h5>
                                        <Link
                                            to="/pricing"
                                            className="mt-3 w-full py-1 px-1 rounded-full bg-[#E27F34] text-white text-center"
                                        >
                                            {myActivePlan ? 'Change Plan' : 'Buy Plan'}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {userProfile && (
                            <div className="relative shrink-0">
                                <button
                                    type="button"
                                    onClick={() => setIsProfileDropdownOpen(prev => !prev)}
                                    className="relative block focus:outline-none"
                                >
                                    <img
                                        className="h-9 w-9 rounded-full object-cover"
                                        src={userProfile.profileImage || "/assets/images/blank-profile.png"}
                                        alt="User Profile"
                                    />
                                </button>

                                {isProfileDropdownOpen && (
                                    <ul className="absolute top-11 right-0 w-[250px] bg-white shadow-lg rounded-md text-center text-dark border z-50">
                                        <li className="border-b border-gray-200">
                                            <div className="flex flex-col items-center px-4 py-4">
                                                <Link to="/profile">
                                                <img
                                                    className="h-14 w-14 rounded-full object-cover cursor-pointer"
                                                    src={userProfile.profileImage || "/assets/images/blank-profile.png"}
                                                    alt="User Profile"
                                                />
                                                </Link>
                                                <div className="mt-2">
                                                    <h4 className="text-lg font-semibold">
                                                        {userProfile.firstName
                                                            ? `${userProfile.firstName} ${userProfile.lastName}`
                                                            : "Demo Account"}
                                                    </h4>
                                                    <p className="text-sm text-gray-500">
                                                        {userProfile.email || "demo@gmail.com"}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="border-t border-gray-200">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full py-3 text-red-600 hover:bg-red-600 hover:text-white"
                                            >
                                                Log Out
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                        )}


                    </div>
                </div>
            </nav>
        </header>
    );
}