import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            console.log("User Registered:", form);
            navigate("/dashboard");
        } catch (err) {
            setError("Registration failed");
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
                <h1 className="text-3xl font-extrabold uppercase text-[#E27F34] md:text-4xl">Sign Up</h1>
                <p className="text-base font-medium text-gray-700 mt-1">
                  Enter your details & register your self
                </p>
              </div>
              <form className="space-y-5 dark:text-gray-700" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" type="text" name="firstName" placeholder="Enter First Name" className="form-input w-full px-3 py-2 rounded-lg border border-gray-300" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" type="text" name="lastName" placeholder="Enter Last Name" className="form-input w-full px-3 py-2 rounded-lg border border-gray-300" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" name="email" placeholder="Enter Email" className="form-input w-full px-3 py-2 rounded-lg border border-gray-300" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" placeholder="Enter Password" className="form-input w-full px-3 py-2 rounded-lg border border-gray-300" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" className="form-input w-full px-3 py-2 rounded-lg border border-gray-300" onChange={handleChange} />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-[#E27F34] to-blue-600 text-white py-2.5 rounded-md font-bold uppercase tracking-wide shadow-md hover:opacity-90 transition">Register</button>
                        </form>
                        <div className="text-center dark:text-gray-700 mt-4">
                            Already have an account?
                            <a href="/login" className="uppercase text-[#E27F34] underline transition hover:text-black dark:hover:text-gray-700">Sign In</a>
                        </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Register;
