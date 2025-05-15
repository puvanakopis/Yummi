import "./Login&Signup.css";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();

    //Navigation to SignUp page
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
                    <form>

                        {/* Email Field */}
                        <div className='email'>
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="Enter Your Email" required />
                        </div>

                        {/* Password Field */}
                        <div className="password">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Enter Your Password" required />
                        </div>

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