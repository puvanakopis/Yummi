import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { MyContext } from "../Context/MyContext";
import './Signup.css'
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const { setLoggedInUser } = useContext(MyContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        const result = await signup(name, email, password);
        if (result.success) {
            navigator("/");
        } else {
            setError(result.message);
        }
    };


    const signup = async (name, email, password) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post('http://localhost:4000/api/auth/register', { name, email, password }, { withCredentials: true });
            if (res.data.success) {
                setLoggedInUser({ name, email, id: res.data.userId });
                return { success: true, message: res.data.message };
            } else {
                return { success: false, message: res.data.message };
            }
        } catch (err) {
            return { success: false, message: err.response?.data?.message || err.message };
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2 className="signup-title MainHeading">Sign Up</h2>
                <div className="signup-box">
                    <form onSubmit={handleSubmit}>
                        <div className="signup-field">
                            <label>Name</label>
                            <input type="text" placeholder="Enter Your Name" value={name} onChange={e => setName(e.target.value)} required />
                        </div>
                        <div className="signup-field">
                            <label>Email</label>
                            <input type="email" placeholder="Enter Your Email" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div className="signup-field">
                            <label>Password</label>
                            <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
                        </div>
                        <div className="signup-field">
                            <label>Confirm Password</label>
                            <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                        </div>

                        {error && <p className="error-message">{error}</p>}

                        <button type="submit" className="signup-btn">Sign Up</button>

                        <p className="signup-login-text">
                            Already have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); navigator('/login') }}> Log In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;