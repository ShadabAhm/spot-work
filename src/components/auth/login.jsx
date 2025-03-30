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
    setError(null); // Reset error state
  
    try {
      const response = await fetch("https://bknd.ira.chat/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: form.username, // Change 'username' to 'identifier'
          password: form.password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Login failed");
      }
  
      const data = await response.json();
      sessionStorage.setItem("token", data.jwt); // Store token (usually 'jwt' in Strapi)
      navigate("/home"); // Redirect to home page
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };
  

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
      <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[500px] lg:flex-row lg:gap-10 xl:gap-0">
        <div className="relative hidden w-full items-center justify-center p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28 ltr:xl:skew-x-[14deg] rtl:xl:skew-x-[-14deg]">
          <div className="absolute inset-y-0 w-8 from-primary/10 via-transparent to-transparent ltr:-right-10 ltr:bg-gradient-to-r rtl:-left-10 rtl:bg-gradient-to-l xl:w-16 ltr:xl:-right-20 rtl:xl:-left-20"></div>
          <div className="ltr:xl:-skew-x-[14deg] rtl:xl:skew-x-[14deg]">
            <a href="/" className="ms-24 block">
              <img src="/assets/images/ira-brand-logo.png" alt="Logo" className="w-full" />
            </a>
          </div>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
          <div className="w-full max-w-[440px] lg:mt-16">
            <div className="mb-10">
              <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign in</h1>
              <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
            </div>
            <form className="space-y-5 dark:text-white" onSubmit={handleLogin}>
              <div>
                <label htmlFor="username">Email</label>
                <div className="relative text-white-dark">
                  <input id="username" type="text" name="username" placeholder="Enter Email" className="form-input ps-10 placeholder:text-white-dark w-full" onChange={handleChange} />
                  <span className="absolute start-4 top-1/2 -translate-y-1/2">📧</span>
                </div>
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <div className="relative text-white-dark">
                  <input id="password" type="password" name="password" placeholder="Enter Password" className="form-input ps-10 placeholder:text-white-dark w-full" onChange={handleChange} />
                  <span className="absolute start-4 top-1/2 -translate-y-1/2">🔒</span>
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">Login</button>
            </form>
            <div className="text-center dark:text-white mt-4">
              Don't have an account? 
              <a href="/register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">SIGN UP</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
