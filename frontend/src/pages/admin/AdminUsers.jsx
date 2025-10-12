import { useState } from 'react';
import './AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active', joinDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active', joinDate: '2024-01-10' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Customer', status: 'Inactive', joinDate: '2024-01-05' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleUserStatus = (userId) => {
        setUsers(users.map(user =>
            user.id === userId
                ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
                : user
        ));
    };

    return (
        <div className="admin-users">
             {/* ----------- Page Header -----------  */}
            <div className="header">
                <h1 className="">User Management</h1>
                <p>Manage all users and their permissions</p>
            </div>

            {/* ----------- Search and Filters ----------- */}
            <div className="users-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-user-btn">Add New User</button>
            </div>



            {/*----------- Users Table ----------- */}
            <div className="users-table">
                <div className="table-header">
                    <div className="table-cell">Name</div>
                    <div className="table-cell">Email</div>
                    <div className="table-cell">Role</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Join Date</div>
                    <div className="table-cell">Actions</div>
                </div>

                {filteredUsers.map(user => (
                    <div key={user.id} className="table-row">
                        <div className="table-cell">{user.name}</div>
                        <div className="table-cell">{user.email}</div>
                        <div className="table-cell">
                            <span className='role-badge'>
                                {user.role}
                            </span>
                        </div>
                        <div className="table-cell">
                            <span className='status-badge'>
                                {user.status}
                            </span>
                        </div>
                        <div className="table-cell">{user.joinDate}</div>
                        <div className="table-cell actions">
                            <button className="btn">Edit</button>
                            <button
                                className='btn'
                                onClick={() => toggleUserStatus(user.id)}
                            >
                                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                            </button>
                            <button className="btn">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminUsers;