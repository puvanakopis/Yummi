import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import { MyContext } from "../Context/MyContext";
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(MyContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = login(email, password);
        if (result.success) {
            navigator("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">

                {/* --------- Login Heading --------- */}
                <h2 className="login-title MainHeading">Log In</h2>

                {/* --------- Login Form Box --------- */}
                <div className="login-box">
                    <form onSubmit={handleSubmit}>

                        {/* Email Field */}
                        <div className="login-field">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="login-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Remember & Forgot */}
                        <div className="login-options">
                            <label className="remember">
                                <input type="checkbox" />
                                <span>Remember Me</span>
                            </label>
                            <a href="" className="forgot-link">Forgot Password?</a>
                        </div>

                        {/* Login Button */}
                        <button type="submit" className="login-btn">Log In</button>

                        {/* Redirect to Sign Up */}
                        <p className="signup-text">
                            Don’t have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); navigator("/signup"); }}> Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
