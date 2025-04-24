import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Pricing = () => {
    const [plans, setPlans] = useState([]);
    const [myActivePlan, setMyActivePlan] = useState(null);
    const [uniqueFeatures, setUniqueFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const authURL = "https://bknd.ira.chat/api/";

    useEffect(() => {
        getPlans();
        getMyActiveSubscription();
    }, []);

    const getPlans = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`${authURL}plans`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const plansData = response.data;
            setPlans(plansData);

            // Extract unique features across all plans
            const features = [
                ...new Set(plansData.flatMap(plan => plan.services.map(service => service.heading)))
            ];
            setUniqueFeatures(features);

            // Add uniqueCategories to each plan
            const plansWithCategories = plansData.map(plan => {
                const uniqueCategories = new Set();
                plan.uniqueCategories = plan.services.filter(service => {
                    if (service.category && !uniqueCategories.has(service.category.name)) {
                        uniqueCategories.add(service.category.name);
                        return true;
                    }
                    return false;
                });
                return plan;
            });

            setPlans(plansWithCategories);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response?.data?.error?.message || 'Failed to Get Plans.');
            setIsLoading(false);
        }
    };

    const getMyActiveSubscription = async () => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.get(`${authURL}subscriptions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMyActivePlan(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error?.message || 'Failed to Fetch Active Plan.');
        }
    };

    const isFeatureIncluded = (plan, feature) => {
        return plan.services.some(s => s.heading === feature);
    };

    const createPaymentOrder = async (plan) => {
        try {
            const token = sessionStorage.getItem('token');
            const response = await axios.post(`${authURL}user-orders`,
                { data: { planId: plan.id } },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            payWithRazor(response.data);
        } catch (error) {
            toast.error(error.response?.data?.error?.message || 'Failed to create payment order.');
        }
    };

    const payWithRazor = (orderResponse) => {
        const options = {
            key: process.env.REACT_APP_RAZORPAY_UI_KEY,
            amount: orderResponse.amount,
            currency: orderResponse.currency,
            name: 'IRA Chat',
            description: '',
            image: '../../assets/images/ira-brand-logo.png',
            order_id: orderResponse.id,
            modal: {
                escape: false,
            },
            theme: {
                color: '#E27F34'
            },
            handler: async (response, error) => {
                if (response?.razorpay_payment_id) {
                    try {
                        const verifyResponse = await axios.post(`${authURL}user-orders/update`,
                            response,
                            { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } }
                        );
                        if (verifyResponse.data?.signatureIsValid === 'true') {
                            toast.success('Payment Successful!');
                            navigate('/');
                        } else {
                            toast.error('Invalid Payment Signature');
                        }
                    } catch (err) {
                        console.error(err);
                        toast.error(err?.response?.data?.message || 'Internal Server Error');
                    }
                } else if (error) {
                    console.error(error);
                    toast.error(error?.error?.message || 'Payment Gateway Error');
                }
            },
            // eslint-disable-next-line
            modal: {
                ondismiss: () => {
                    toast.error('Transaction cancelled.');
                }
            }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) {
        return <div className="text-center py-10">Loading plans...</div>;
    }

    return (
        <div>
            {/* Pricing Section */}
            <section className="relative overflow-hidden bg-white dark:bg-dark mb-4">
                <div className="container mx-auto px-4">
                    <div className="w-full px-2 mt-2">
                        <div className="mx-auto mb-10 max-w-[510px] text-center">
                            <h2 className="mb-3 text-xl leading-[1.208] font-bold text-[#E27F34] dark:text-[#E27F34] sm:text-4xl md:text-[40px]">
                                Choose a Plan
                            </h2>
                            <p className="text-base text-body-color dark:text-dark-6">
                                Choose the features and functionality your team needs today. Easily upgrade as your company grows.
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center -mx-4">
                        {plans.map((item) => (
                            <div key={item.id} className="w-full px-4 md:w-1/2 lg:w-1/3 mb-8">
                                <div className={`relative z-10 overflow-hidden rounded-[10px] border-2 flex flex-col h-full 
                                    ${item.id === myActivePlan?.plan?.id ? 'border-[#E27F34]' : 'border-stroke dark:border-dark-3'} 
                                    bg-white dark:bg-dark-2 shadow-pricing`}>
                                    <div className="py-6 px-4 sm:p-12 lg:py-6 lg:px-4 xl:p-[30px]">
                                        <span className={`mb-3 block text-lg font-semibold 
                                            ${item.id === myActivePlan?.plan?.id ? 'text-[#E27F34]' : 'text-[#E27F34]'}`}>
                                            <h4 className="font-bold text-4xl">{item.name}</h4>
                                        </span>
                                        <h2 className="mb-5 text-[32px] font-bold text-gray-700">
                                            <span>INR {item.price}</span>
                                            <span className="text-base font-medium text-body-color dark:text-dark-6">
                                                / month
                                            </span>
                                        </h2>
                                        <div className="mb-9 flex flex-col gap-[14px]">
                                            <div>
                                                <h1 className="text-2xl text-[#E27F34] font-bold border-b border-gray-200">
                                                    Categories
                                                </h1>
                                                {item.uniqueCategories.map((service, index) => (
                                                    <p key={index} className="text-lg text-gray-800 font-semibold px-2 mt-2">
                                                        {service?.category?.name}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => createPaymentOrder(item)}
                                            className="block w-full rounded-md border border-stroke dark:border-dark-3 bg-transparent p-3 text-center text-base font-medium text-[#E27F34] transition hover:border-[#E27F34] hover:bg-[#E27F34] hover:text-white">
                                            {item.id === myActivePlan?.plan?.id ? 'Buy Again' : 'Buy Now'}
                                        </button>
                                        <div>
                                            <span className="absolute right-0 top-7 z-[-1]">
                                                <svg width="77" height="172" viewBox="0 0 77 172" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="86" cy="86" r="86" fill="url(#paint0_linear)" />
                                                    <defs>
                                                        <linearGradient id="paint0_linear" x1="86" y1="0" x2="86" y2="172" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#E27F34" stopOpacity="0.09" />
                                                            <stop offset="1" stopColor="#C4C4C4" stopOpacity="0" />
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </span>
                                            <span className="absolute right-4 top-4 z-[-1]">
                                                <svg width="41" height="89" viewBox="0 0 41 89" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    {[...Array(32)].map((_, i) => (
                                                        <circle
                                                            key={i}
                                                            cx={i % 4 === 0 ? "38.9138" : i % 4 === 1 ? "26.4157" : i % 4 === 2 ? "13.9177" : "1.41963"}
                                                            cy={87.4849 - (Math.floor(i / 4) * 12.4978)}
                                                            r="1.42021"
                                                            transform={`rotate(180 ${i % 4 === 0 ? "38.9138" : i % 4 === 1 ? "26.4157" : i % 4 === 2 ? "13.9177" : "1.41963"} ${87.4849 - (Math.floor(i / 4) * 12.4978)})`}
                                                            fill="#E27F34"
                                                        />
                                                    ))}
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                    {item.id === myActivePlan?.plan?.id && (
                                        <div className="active-tag bg-[#E27F34] text-white text-center py-1">
                                            Expiry: {formatDate(myActivePlan.endDate)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Compare Plans Section */}
            <div className="relative mt-10 z-10 overflow-hidden rounded-[10px] bg-white dark:bg-dark-2 shadow-pricing flex flex-col h-full py-6 px-4 sm:p-12 lg:py-6 lg:px-4 xl:p-[30px]">
                <h2 className="flex justify-center mb-3 text-xl leading-[1.208] font-bold text-[#E27F34] dark:text-[#E27F34] sm:text-4xl md:text-[40px]">
                    Compare Plans
                </h2>
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white dark:bg-dark border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 font-bold dark:bg-dark-3 text-xl">
                                <th className="border border-gray-300 px-6 py-3 text-center">Subjects</th>
                                {plans.map(plan => (
                                    <th key={plan.id} className="border border-gray-300 px-6 py-3 text-center">
                                        {plan.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {uniqueFeatures.map(feature => (
                                <tr key={feature}>
                                    <td className="border border-gray-300 px-6 py-3 font-bold">{feature}</td>
                                    {plans.map(plan => (
                                        <td key={`${plan.id}-${feature}`} className="border border-gray-300 px-6 py-3 text-center">
                                            {isFeatureIncluded(plan, feature) ? '✅' : '❌'}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Pricing;