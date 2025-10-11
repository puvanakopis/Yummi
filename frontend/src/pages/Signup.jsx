import { useNavigate } from "react-router-dom";
import './Signup.css'

const Signup = () => {

    const navigate = useNavigate();

    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };

    return (
        <div className="signup-page">
            <div className="signup-container">

                {/* ------------ signup Heading ------------ */}
                <h2 className="signup-title MainHeading">Sign Up</h2>

                {/* ------------ signup Form Box ------------ */}
                <div className="signup-box">
                    <form>
                        {/* Name Field */}
                        <div className="signup-field name">
                            <label htmlFor="name">Name</label>
                            <input type="name" id="name" placeholder="Enter Your Name" required />
                        </div>

                        {/* Email Field */}
                        <div className="signup-field email">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter Your Email" required />
                        </div>

                        {/* Password Field */}
                        <div className="signup-field password">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password" required />
                        </div>

                        <div className="signup-field password">
                            <label htmlFor="password">Rewrite Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password Again" required />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="signup-btn">Sign Up</button>

                        {/* Redirect to Log in */}
                        <p className="signup-login-text">
                            Already have an account?
                            <a href="" className="signup-login-link" onClick={(e) => { e.preventDefault(); navigator('/login') }}> &nbsp; Log In </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;