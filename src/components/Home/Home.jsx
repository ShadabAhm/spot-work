import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

export default function Home() {
    const [groupedServices, setGroupedServices] = useState({});
    const [filteredServices, setFilteredServices] = useState({});
    const [expandedCategories, setExpandedCategories] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const itemsPerPage = 4;
    const headerText = "What's in your mind?";
    const description = "Unlock new ideas, let's dive into something amazing today!";

    useEffect(() => {
        if (location.state?.showCelebration) {
            setShowConfetti(true);
            const timer = setTimeout(() => {
                setShowConfetti(false);
            }, 5000);
            fetchSubscriptionServices();
            return () => clearTimeout(timer);
        } else {
            fetchSubscriptionServices();
        }
    }, [location.state]);

    useEffect(() => {
        // Filter services whenever searchTerm or groupedServices changes
        if (searchTerm.trim() === '') {
            setFilteredServices(groupedServices);
        } else {
            const filtered = {};
            Object.keys(groupedServices).forEach(category => {
                const matchedServices = groupedServices[category].filter(service => 
                    service.heading.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                if (matchedServices.length > 0) {
                    filtered[category] = matchedServices;
                }
            });
            setFilteredServices(filtered);
        }
    }, [searchTerm, groupedServices]);

    const fetchSubscriptionServices = async () => {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                throw new Error("No authentication token found");
            }
            
            const response = await axios.get("https://bknd.ira.chat/api/subscriptions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const grouped = {};
            response.data.plan?.services?.forEach((service) => {
                const category = service?.category?.name || "Other";
                if (!grouped[category]) grouped[category] = [];
                grouped[category].push(service);
            });

            setGroupedServices(grouped);
            setFilteredServices(grouped); // Initialize filtered services with all services
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching services:", error);
            toast.error("Failed to load subscription services. Please try again.");
            setIsLoading(false);
        }
    };

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({
            ...prev,
            [category]: !prev[category]
        }));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="px-2 py-2">
           
            {/* {showConfetti && (
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.2}
                />
            )} */}

            {/* Success message */}
            {showConfetti && (
                <div className="fixed top-20 right-5 z-50">
                    <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg animate-bounce">
                        Login Successful! 🎉
                    </div>
                </div>
            )}
            
            <div className="flex items-center justify-center mb-8">
                <div className="w-full max-w-4xl">
                    <h1 className='flex justify-center text-3xl font-bold text-[#E27F34]'>{headerText}</h1>
                    <h3 className="text-xl font-semibold text-gray-800 mt-2 text-center">{description}</h3>
                    
                    {/* Search Filter Input */}
                    <div className="mt-6 relative">
                        <input
                            type="text"
                            placeholder="Search subjects..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E27F34] focus:border-transparent"
                        />
                        <svg 
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <h1 className='flex justify-center text-3xl font-semibold text-[#E27F34] mt-4'>Your Popular Subjects</h1>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                Object.keys(filteredServices).length > 0 ? (
                    Object.keys(filteredServices).map((category) => {
                        const services = filteredServices[category];
                        const isExpanded = expandedCategories[category];
                        const servicesToDisplay = isExpanded ? services : services.slice(0, itemsPerPage);

                        return (
                            <div key={category} className="mb-8">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-bold text-[#E27F34]">{category}</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
                                    {servicesToDisplay.map((service, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition duration-200"
                                        >
                                            <div className="font-medium text-gray-800">
                                                {service.heading || service?.metadata?.label}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {service?.description || 'No description'}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {services.length > itemsPerPage && (
                                    <div className="flex justify-end items-center mt-2 mr-4">
                                        <button
                                            onClick={() => toggleCategory(category)}
                                            className="text-blue-600 hover:underline text-sm"
                                        >
                                            {isExpanded ? "Show less" : "Show more"}
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-gray-500">
                        {searchTerm.trim() ? 
                            "No subjects match your search criteria" : 
                            "No subjects available"
                        }
                    </div>
                )
            )}
        </div>
    );
}