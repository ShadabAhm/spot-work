import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch("https://bknd.ira.chat/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: form.username,
          password: form.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Login failed");
      }
  
      const data = await response.json();
      sessionStorage.setItem("token", data.jwt);
      navigate("/home", { state: { showCelebration: true } }); // Add state
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };


  return (
    <div
    className="relative flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 sm:px-10"
    style={{ backgroundImage: "url('/assets/images/map.png')" }}
  >
    <div className="relative z-10 flex w-full max-w-[800px] flex-col justify-between overflow-hidden rounded-xl backdrop-blur-lg bg-white/50 lg:min-h-[400px] lg:flex-row shadow-xl">
      {/* Left Section with Logo */}
      <div className="relative hidden w-full items-center justify-center lg:flex lg:max-w-[700px] xl:-ms-28">
        <div className="absolute inset-y-0 w-8 "></div>
        <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
          <a href="/" className="block ms-24 mr-1">
            <img src="/assets/images/ira-brand-logo.png" alt="Logo" className="ml-4 px-2 w-full" />
          </a>
        </div>
      </div>
      {/* Login Form Section */}
      <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 py-4 sm:px-6 lg:max-w-[667px] bg-gradient-to-r from-[#E27F34]/5 to-transparent">
        <div className="w-full max-w-[440px]">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-3xl font-extrabold uppercase text-[#E27F34] md:text-4xl">Sign In</h1>
            <p className="text-base font-medium text-white-dark mt-1">
              Enter your email and password to login
            </p>
          </div>
          <form className="space-y-5 " onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block mb-1 font-medium text-gray-700">Email</label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="email"
                  placeholder="Enter Email"
                  className="form-input w-full ps-8 py-2 bg-white/10 rounded-lg border border-black/20 text-gray-700 placeholder:text-white-dark"
                  onChange={handleChange}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-700"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" ng-reflect-ng-class=""><path opacity="0.5" d="M10.65 2.25H7.35C4.23873 2.25 2.6831 2.25 1.71655 3.23851C0.75 4.22703 0.75 5.81802 0.75 9C0.75 12.182 0.75 13.773 1.71655 14.7615C2.6831 15.75 4.23873 15.75 7.35 15.75H10.65C13.7613 15.75 15.3169 15.75 16.2835 14.7615C17.25 13.773 17.25 12.182 17.25 9C17.25 5.81802 17.25 4.22703 16.2835 3.23851C15.3169 2.25 13.7613 2.25 10.65 2.25Z" fill="currentColor"></path><path d="M14.3465 6.02574C14.609 5.80698 14.6445 5.41681 14.4257 5.15429C14.207 4.89177 13.8168 4.8563 13.5543 5.07507L11.7732 6.55931C11.0035 7.20072 10.4691 7.6446 10.018 7.93476C9.58125 8.21564 9.28509 8.30993 9.00041 8.30993C8.71572 8.30993 8.41956 8.21564 7.98284 7.93476C7.53168 7.6446 6.9973 7.20072 6.22761 6.55931L4.44652 5.07507C4.184 4.8563 3.79384 4.89177 3.57507 5.15429C3.3563 5.41681 3.39177 5.80698 3.65429 6.02574L5.4664 7.53583C6.19764 8.14522 6.79033 8.63914 7.31343 8.97558C7.85834 9.32604 8.38902 9.54743 9.00041 9.54743C9.6118 9.54743 10.1425 9.32604 10.6874 8.97558C11.2105 8.63914 11.8032 8.14522 12.5344 7.53582L14.3465 6.02574Z" fill="currentColor"></path></svg></span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="form-input w-full ps-8 py-2 bg-white/10 rounded-lg border border-black/20 text-gray-700 placeholder:text-white-dark"
                  onChange={handleChange}
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-700"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" ng-reflect-ng-class=""><path opacity="0.5" d="M1.5 12C1.5 9.87868 1.5 8.81802 2.15901 8.15901C2.81802 7.5 3.87868 7.5 6 7.5H12C14.1213 7.5 15.182 7.5 15.841 8.15901C16.5 8.81802 16.5 9.87868 16.5 12C16.5 14.1213 16.5 15.182 15.841 15.841C15.182 16.5 14.1213 16.5 12 16.5H6C3.87868 16.5 2.81802 16.5 2.15901 15.841C1.5 15.182 1.5 14.1213 1.5 12Z" fill="currentColor"></path><path d="M6 12.75C6.41421 12.75 6.75 12.4142 6.75 12C6.75 11.5858 6.41421 11.25 6 11.25C5.58579 11.25 5.25 11.5858 5.25 12C5.25 12.4142 5.58579 12.75 6 12.75Z" fill="currentColor"></path><path d="M9 12.75C9.41421 12.75 9.75 12.4142 9.75 12C9.75 11.5858 9.41421 11.25 9 11.25C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75Z" fill="currentColor"></path><path d="M12.75 12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12C11.25 11.5858 11.5858 11.25 12 11.25C12.4142 11.25 12.75 11.5858 12.75 12Z" fill="currentColor"></path><path d="M5.0625 6C5.0625 3.82538 6.82538 2.0625 9 2.0625C11.1746 2.0625 12.9375 3.82538 12.9375 6V7.50268C13.363 7.50665 13.7351 7.51651 14.0625 7.54096V6C14.0625 3.20406 11.7959 0.9375 9 0.9375C6.20406 0.9375 3.9375 3.20406 3.9375 6V7.54096C4.26488 7.51651 4.63698 7.50665 5.0625 7.50268V6Z" fill="currentColor"></path></svg></span>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-[#E27F34] to-blue-600 text-white py-2.5 rounded-md font-bold uppercase tracking-wide shadow-md hover:opacity-90 transition"
            >
              Login
            </button>
          </form>

          <div className="mt-5 text-center text-gray-700">
            Don’t have an account?
            <a href="/register" className="ml-1 underline hover:text-gray-700 text-[#E27F34]">SIGN UP</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
