import './Account.css';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
    const { user, logout } = useContext(MyContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return (
            <div className='AccountPage'>
                <div className="AccountPage-container">
                    <h2 className="AccountPage-title MainHeading">Account Info</h2>
                    <p>You are not logged in.</p>
                    <button className='mainButton' onClick={() => navigate('/Login')}>Go to Login</button>
                </div>
            </div>
        );
    }

    return (
        <div className='AccountPage'>
            <div className="AccountPage-container">

                <h2 className="AccountPage-title MainHeading">My Account</h2>

                <div className="AccountPage-box">
                    <div className="account_details">
                        <div className="detail">
                            <label>Name</label>
                            <input type="text" value={user.username || "User Name"} readOnly />
                        </div>
                        
                        <div className="detail">
                            <label>Email</label>
                            <input type="text" value={user.email} readOnly />
                        </div>

                        <div className="detail">
                            <label>Phone</label>
                            <input type="text" value={user.phone || "Not Provided"} readOnly />
                        </div>
                    </div>

                    <div className='AccountPageButton'>
                        <button className="mainButton" onClick={handleLogout}>Logout</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AccountPage;
