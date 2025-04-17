import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    // scroll listener
    const onScroll = () => {
      if (window.scrollY > 50) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-black dark:text-white-dark">
      <Outlet />

      {showTopButton && (
        <button
          onClick={goToTop}
          className="fixed bottom-5 right-5 z-50 rounded-full bg-gray-800 p-3 text-white shadow-lg"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default AuthLayout;
