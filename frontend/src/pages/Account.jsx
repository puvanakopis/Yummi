import './Account.css';
import { useContext, useEffect } from 'react';
import { MyContext } from '../context/MyContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
  const { user, setUser, logout } = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        axios.defaults.withCredentials = true; 
        const res = await axios.post('http://localhost:4000/api/auth/getUser');

        if (res.data.success) {
          setUser(res.data.user); 
        } else {
          console.log(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [setUser]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return (
      <div className='account-page'>
        <div className="container">
          <h2 className="title MainHeading">Account Info</h2>
          <p>You are not logged in.</p>
          <button className='mainButton' onClick={() => navigate('/login')}>Go to Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className='account-page'>
      <div className="container">
        <h2 className="title MainHeading">My Account</h2>
        <div className="box">
          <div className="account_details">
            <div className="detail">
              <label>Name</label>
              <input type="text" value={user.name} readOnly />
            </div>
            <div className="detail">
              <label>Email</label>
              <input type="text" value={user.email} readOnly />
            </div>
            <div className="detail">
              <label>User ID</label>
              <input type="text" value={user._id} readOnly />
            </div>
          </div>
          <div className='account-button'>
            <button className="mainButton" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;