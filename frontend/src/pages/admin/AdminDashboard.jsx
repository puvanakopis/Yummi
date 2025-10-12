import './AdminDashboard.css';

const AdminDashboard = () => {
  // Mock data for dashboard stats
  const stats = [
    { title: 'Total Users', value: '1,234' },
    { title: 'Total Products', value: '567' },
    { title: 'Total Orders', value: '890' },
    { title: 'Revenue', value: 'Rs 1,234,567' }
  ];

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
      </div>

      {/* ----------- Stats Cards ----------- */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className='stat-card'>
            <h3>{stat.title}</h3>
            <div className="stat-value">{stat.value}</div>
          </div>
        ))}
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