import "./Login&Signup.css";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { MyContext } from "../Context/MyContext";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(MyContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Handle login form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);

        if (result.success) {
            window.scrollTo({ top: 0, behavior: "smooth" });
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    // Navigation to SignUp page
    const handleOrderNow = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/SignUp");
    };

    return (
        <div className='Login'>
            <div className="login-container">

                {/* Login Heading */}
                <h2 className="login-title MainHeading">Log in</h2>

                {/* Login Form Box */}
                <div className="login-box">
                    <form onSubmit={handleSubmit}>

                        {/* Email Field */}
                        <div className='email'>
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="Enter Your Email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                placeholder="Enter Your Password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Error Message */}
                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        {/* Remember Me & Forgot Password */}
                        <div className="options">
                            <label className="options1 flex items-center space-x-2">
                                <input type="checkbox" className="w-4 h-4" />
                                <span>Remember&nbsp;Me</span>
                            </label>
                            <a href="#" className="options2 text-sm text-orange-600 font-bold">Forgot Password</a>
                        </div>

                        {/* Login Button */}
                        <button type="submit" className="login-btn">Log In</button>

                        {/* Redirect to Sign Up */}
                        <p className="signup-text">
                            Don’t have an account?{" "}
                            <a href="#" onClick={(e) => { e.preventDefault(); handleOrderNow(); }}>
                                &nbsp; Sign Up
                            </a>
                        </p>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
