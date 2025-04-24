import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("https://bknd.ira.chat/api/users/me?populate=*", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const profileData = await response.json();
                setUser(profileData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (error) {
        return (
            <div className="text-center mt-10 text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="text-center mt-10">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/map.png" alt="background" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex items-center justify-center py-8">
                {/* Profile Picture Container */}
                <div className="absolute -top-0 left-1/2 transform -translate-x-1/2 z-10 ">
                    <div className="relative h-36 w-36 mt-4">
                        <div className="absolute inset-0 rounded-full border-4 border-white overflow-hidden shadow-lg">
                            <img
                                src="/assets/images/blank-profile.png"
                                alt="Profile"
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/assets/images/blank-profile.png";
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="max-w-md w-full mx-4 bg-white/90 backdrop-blur-sm pt-20 pb-8 px-8 rounded-xl shadow-lg border border-white/20 mt-16">
                    <h1 className="text-3xl font-bold mb-8 text-center text-[#E27F34]">Profile</h1>

                    <div className="space-y-6">
                        {/* First Name Section */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-sm font-medium text-gray-500 mb-1">First Name</h2>
                            <p className="text-xl font-semibold">{user.firstName || "Demo"}</p>
                        </div>

                        {/* Email Section */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-sm font-medium text-gray-500 mb-1">Email</h2>
                            <p className="text-xl font-semibold">{user.email || "demoaccount1@gmail.com"}</p>
                        </div>

                        {/* Last Name Section */}
                        <div className="border-b border-gray-200 pb-4">
                            <h2 className="text-sm font-medium text-gray-500 mb-1">Last Name</h2>
                            <p className="text-xl font-semibold">{user.lastName || "Account1"}</p>
                        </div>

                        {/* Joined On Section */}
                        <div>
                            <h2 className="text-sm font-medium text-gray-500 mb-1">Joined On</h2>
                            <p className="text-xl font-semibold">
                                {user.createdAt ?
                                    new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric"
                                    }) :
                                    "February 19, 2025"
                                }
                            </p>
                        </div>
                    </div>

                    {/* Display Name at Bottom */}
                    <div className="mt-10 pt-6 border-t border-gray-200">
                        <p className="text-xl font-bold text-center text-gray-800">
                            {`${user.firstName || "Demo"} ${user.lastName || "Account1"}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
