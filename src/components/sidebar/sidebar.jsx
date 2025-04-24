import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define your static menu items
const MENU = [
  {
    label: "Dashboard",
    icon: "home",
    link: "/home",
    isTitle: false
  },
  {
    label: "Others",
    isTitle: true
  },
  {
    label: "Profile",
    icon: "profle",
    link: "/profile",
    isTitle: false
  },
  {
    label: "Subjects",
    isTitle: true
  },
  
];

const Sidebar = ({ toggleSidebar, isSidebarOpen }) => {
  const [menuItems, setMenuItems] = useState(MENU);
  const [expandedItems, setExpandedItems] = useState([]);
  const location = useLocation();
  const sidebarRef = useRef(null);

  useEffect(() => {
    fetchSubscriptionData();
    activateMenuItems();
    // eslint-disable-next-line
  }, [location.pathname]);

  const fetchSubscriptionData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get("https://bknd.ira.chat/api/subscriptions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const categories = {};
      
      // Categorize services dynamically
      response.data.plan?.services?.forEach((service) => {
        const newItem = {
          link: service?.metadata?.link ?? '',
          label: service?.metadata?.label ?? service?.heading ?? '',
          icon: service?.metadata?.icon ?? '',
          badge: service?.metadata?.badge ? {
            variant: service.metadata.badge.variant || 'primary',
            text: service.metadata.badge.text
          } : null
        };

        const categoryName = service?.category?.name ?? 'Other';
        if (!categories[categoryName]) {
          categories[categoryName] = [];
        }
        categories[categoryName].push(newItem);
      });

      // Convert categories to menu items
      const dynamicCategories = Object.keys(categories).map(categoryLabel => ({
        label: categoryLabel,
        icon: '',
        subItems: categories[categoryLabel],
        expanded: false
      })).filter(category => category.subItems.length > 0);

      setMenuItems([...MENU, ...dynamicCategories]);
    } catch (error) {
      toast.error(error.response?.data?.error?.message || 'Failed to fetch subscription data');
    }
  };

  const toggleSubMenu = (itemLabel) => {
    setExpandedItems(prev => 
      prev.includes(itemLabel) 
        ? prev.filter(label => label !== itemLabel) 
        : [...prev, itemLabel]
    );
  };

  const hasItems = (item) => {
    return item.subItems && item.subItems.length > 0;
  };

  const isItemActive = (item) => {
    if (item.link) {
      return location.pathname === item.link;
    }
    if (item.subItems) {
      return item.subItems.some(subItem => location.pathname === subItem.link);
    }
    return false;
  };

  const activateMenuItems = () => {
    const path = location.pathname;
    const newExpandedItems = [...expandedItems];
    
    menuItems.forEach(item => {
      if (hasItems(item) && item.subItems.some(subItem => subItem.link === path)) {
        if (!newExpandedItems.includes(item.label)) {
          newExpandedItems.push(item.label);
        }
      }
    });
    
    setExpandedItems(newExpandedItems);
  };

  return (
    <aside 
      ref={sidebarRef}
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white text-gray-700 flex flex-col shadow-lg transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between h-[70px] px-4 border-b border-gray-200 bg-white">
        <img 
          src="/assets/images/irachat-logo.png" 
          className="h-[85px] w-[190px] object-contain" 
          alt="Logo" 
        />
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-orange-500 text-2xl rounded-full p-1 transition-colors duration-200"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Sidebar Links with perfect scroll behavior */}
      <div className="flex-1 overflow-hidden hover:overflow-y-auto">
        <nav className="h-full">
          <ul className="py-2 px-3 space-y-1">
            {menuItems.map((item, index) => (
              <React.Fragment key={`${item.label}-${index}`}>
                {item.isTitle ? (
                  <li className="mt-4 mb-2 first:mt-2">
                    <span className="block px-3 py-2 text-xl font-bold uppercase tracking-wider text-gray-400">
                      {item.label}
                    </span>
                  </li>
                ) : (
                  <li>
                    {hasItems(item) ? (
                      <div className="space-y-1">
                        <button
                          onClick={() => toggleSubMenu(item.label)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-lg font-medium ${
                            isItemActive(item) 
                              ? 'bg-gray-100 text-[#E27F34]'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                          }`}
                        >
                          <div className="flex items-center">
                            {item.icon && (
                              <i className={`mr-3 ${item.icon}`}></i>
                            )}
                            <span>{item.label}</span>
                          </div>
                          <svg
                            className={`h-4 w-4 transform transition-transform ${
                              expandedItems.includes(item.label) ? 'rotate-0' : '-rotate-90'
                            }`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        {expandedItems.includes(item.label) && (
                          <ul className="pl-2 mt-1 space-y-1 border-l-2 border-gray-200">
                            {item.subItems.map((subItem, subIndex) => (
                              <li key={`${subItem.label}-${subIndex}`}>
                                <Link
                                  to={subItem.link}
                                  className={`block px-2 py-2 rounded-md text-sm font-medium ${
                                    location.pathname === subItem.link
                                      ? 'bg-[#E27F34] text-white'
                                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                  }`}
                                >
                                  <div className="flex items-center">
                                    {subItem.icon && (
                                      <i className={`mr-3 ${subItem.icon}`}></i>
                                    )}
                                    <span>{subItem.label}</span>
                                    {subItem.badge && (
                                      <span className={`ml-auto inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${subItem.badge.variant}-100 text-${subItem.badge.variant}-800`}>
                                        {subItem.badge.text}
                                      </span>
                                    )}
                                  </div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.link}
                        className={`block py-2 rounded-md text-lg font-bold ${
                          isItemActive(item)
                            ? 'bg-[#E27F34] text-white'
                            : 'text-[#E27F34] hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center">
                          {item.icon && (
                            <i className={`mr-3 ${item.icon}`}></i>
                          )}
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    )}
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;