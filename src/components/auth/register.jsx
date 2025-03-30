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
        <div className="relative flex min-h-screen items-center justify-center bg-[url('/assets/images/map.svg')] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
            <div className="relative flex w-full max-w-[1502px] flex-col justify-between overflow-hidden rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 lg:min-h-[500px] lg:flex-row lg:gap-10 xl:gap-0">
                <div className="relative hidden w-full items-center justify-center p-5 lg:inline-flex lg:max-w-[835px] xl:-ms-28">
                    <a href="/" className="ms-24 block">
                        <img src="/assets/images/ira-brand-logo.png" alt="Logo" className="w-full" />
                    </a>
                </div>
                <div className="relative flex w-full flex-col items-center justify-center gap-6 px-4 pb-16 pt-6 sm:px-6 lg:max-w-[667px]">
                    <div className="w-full max-w-[440px] lg:mt-16">
                        <div className="mb-10">
                            <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Sign Up</h1>
                            <p className="text-base font-bold leading-normal text-white-dark">Create your account</p>
                        </div>
                        <form className="space-y-5 dark:text-white" onSubmit={handleRegister}>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input id="firstName" type="text" name="firstName" placeholder="Enter First Name" className="form-input w-full" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input id="lastName" type="text" name="lastName" placeholder="Enter Last Name" className="form-input w-full" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" name="email" placeholder="Enter Email" className="form-input w-full" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input id="password" type="password" name="password" placeholder="Enter Password" className="form-input w-full" onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input id="confirmPassword" type="password" name="confirmPassword" placeholder="Confirm Password" className="form-input w-full" onChange={handleChange} />
                            </div>
                            {error && <p className="text-red-500">{error}</p>}
                            <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase">Register</button>
                        </form>
                        <div className="text-center dark:text-white mt-4">
                            Already have an account?
                            <a href="/login" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">Sign In</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
