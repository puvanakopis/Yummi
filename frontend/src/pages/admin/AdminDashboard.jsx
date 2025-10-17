import './AdminDashboard.css';
import { useContext } from 'react';
import { MyContext } from "../../Context/MyContext";

const AdminDashboard = () => {
  const { users, items, orders } = useContext(MyContext);

  const recentActivities = [
    { id: 1, activity: 'New order #1234 received', time: '2 min ago' },
    { id: 2, activity: 'User John Doe registered', time: '5 min ago' },
    { id: 3, activity: 'Product "Chocolate Cake" updated', time: '10 min ago' },
    { id: 4, activity: 'Order #1233 delivered', time: '15 min ago' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="header">
        <h1>Admin Dashboard</h1>
        <p>View and manage overall system statistics, users, orders, and settings</p>
      </div>

      {/* ----------- Stats Cards ----------- */}
      <div className="stats-grid">
        <div className='stat-card'>
          <h3>Total Users</h3>
          <div className="stat-value">{users.length}</div>
        </div>

        <div className='stat-card'>
          <h3>Total Products</h3>
          <div className="stat-value">{items.length}</div>
        </div>

        <div className='stat-card'>
          <h3>Total Orders</h3>
          <div className="stat-value">{orders.length}</div>
        </div>

        <div className='stat-card'>
          <h3>Revenue</h3>
          <div className="stat-value">Rs {orders.reduce((total, order) => total + order.grandTotal, 0)}.00</div>
        </div>
      </div>

      {/* ----------- Recent Activities ----------- */}
      <div className="dashboard-section">
        <h2>Recent Activities</h2>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-text">{activity.activity}</div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;