import './Account.css';
import { useContext } from 'react';
import { MyContext } from '../Context/MyContext';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { loggedInUser, logout } = useContext(MyContext);
  const navigate = useNavigate();


  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!loggedInUser) {
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
              <input type="text" value={loggedInUser.name} readOnly />
            </div>
            <div className="detail">
              <label>Email</label>
              <input type="text" value={loggedInUser.email} readOnly />
            </div>
            <div className="detail">
              <label>User ID</label>
              <input type="text" value={loggedInUser.id} readOnly />
            </div>
            <div className="detail">
              <label>Role</label>
              <input type="text" value={loggedInUser.role} readOnly />
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