// import "./Login&Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    //Navigating
    const navigate = useNavigate();
    const navigator = (path) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate(path);
    };

    return (
        <div className="Login flex justify-center items-center">
            <div className="login-container">

                {/* Login Heading */}
                <h2 className="login-title MainHeading">Sign Up</h2>

                {/* Login Form Box */}
                <div className="login-box">
                    <form>

                        {/* Email Field */}
                        <div className="email">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter Your Email" required />
                        </div>

                        {/* Phone number Field */}
                        <div className="phone">
                            <label htmlFor="number">Phone Number</label>
                            <input type="phone" id="number" placeholder="Enter Your Phone Number" required />
                        </div>

                        {/* Password Field */}
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password" required />
                        </div>

                        <div className="password">
                            <label htmlFor="password">Rewrite Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password Again" required />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="login-btn">Log In</button>

                        {/* Redirect to Log in */}
                        <p className="signup-text">
                            Already have an account?
                            <a href="#" onClick={(e) => { e.preventDefault(); navigator('/Login') }}> &nbsp; Log In </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;