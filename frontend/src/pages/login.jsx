import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";
import axios from 'axios';
import { MyContext } from '../context/MyContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(MyContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };

    // ------------------- User Authentication -------------------
    const login = async (email, password) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(
                'http://localhost:4000/api/auth/login',
                { email, password },
                { withCredentials: true }
            );

            if (res.data.success) {
                setUser({ name: res.data.name, email, id: res.data.userId });
                return { success: true, message: res.data.message };
            } else {
                return { success: false, message: res.data.message };
            }
        } catch (err) {
            return { success: false, message: err.response?.data?.message || err.message };
        }
    };

    // ------------------- Handle Form Submit -------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(email, password);
        if (result.success) {
            navigator("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title MainHeading">Log In</h2>
                <div className="login-box">
                    <form onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label>Email Address</label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="login-field">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="login-btn">Log In</button>

                        <p className="signup-text">
                            Don’t have an account?
                            <a
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigator("/signup");
                                }}
                            >
                                {" "}Sign Up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;