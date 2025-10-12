import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUsers.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [addingUser, setAddingUser] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'customer',
        status: 'activate',
        password: ''
    });

    // -------- Fetch Users --------
    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/users');
            setUsers(res.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // -------- Toggle User Status --------
    const toggleUserStatus = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'activate' ? 'inactivate' : 'activate';
            await axios.put(`http://localhost:4000/api/users/${id}`, { status: newStatus });
            fetchUsers();
        } catch (error) {
            console.error('Error updating user status:', error);
        }
    };

    // -------- Delete User --------
    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:4000/api/users/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    // -------- Edit User --------
    const handleEdit = (user) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status,
        });
    };

    // -------- Add User --------
    const handleAddUser = () => {
        setAddingUser(true);
        setFormData({
            name: '',
            email: '',
            password: '',
            role: 'customer',
            status: 'activate',
        });
    };

    // -------- Handle Input Change --------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // -------- Submit Update --------
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/api/users/${editingUser._id}`, formData);
            setEditingUser(null);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    // -------- Submit Add User --------
    const handleCreateUser = async () => {
        try {
            await axios.post('http://localhost:4000/api/auth/register', formData);
            setAddingUser(false);
            fetchUsers();
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    // -------- Filtered List --------
    const filteredUsers = users.filter((user) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="admin-users">
            <div className="header">
                <h1>User Management</h1>
                <p>Manage all users, roles, and account status</p>
            </div>

            <div className="users-controls">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-user-btn" onClick={handleAddUser}>+ Add New User</button>
            </div>

            <div className="users-table">
                <div className="table-header">
                    <div className="table-cell">Name</div>
                    <div className="table-cell">Email</div>
                    <div className="table-cell">Role</div>
                    <div className="table-cell">Status</div>
                    <div className="table-cell">Join Date</div>
                    <div className="table-cell">Actions</div>
                </div>

                {filteredUsers.map((user) => (
                    <div key={user._id} className="table-row">
                        <div className="table-cell">{user.name}</div>
                        <div className="table-cell">{user.email}</div>
                        <div className="table-cell">
                            <span className={`role-badge ${user.role}`}>{user.role}</span>
                        </div>
                        <div className="table-cell">
                            <span className={`status-badge ${user.status}`}>
                                {user.status}
                            </span>
                        </div>
                        <div className="table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                        <div className="table-cell actions">
                            <button className="btn edit" onClick={() => handleEdit(user)}>Edit</button>
                            <button
                                className="btn"
                                onClick={() => toggleUserStatus(user._id, user.status)}
                            >
                                {user.status === 'activate' ? 'Inactivate' : 'Activate'}
                            </button>
                            <button className="btn" onClick={() => deleteUser(user._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {(editingUser || addingUser) && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>{editingUser ? 'Edit User' : 'Add User'}</h2>

                        <label>Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} />

                        <label>Email</label>
                        <input name="email" value={formData.email} onChange={handleChange} />

                        {!editingUser && (
                            <>
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </>
                        )}

                        <label>Role</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </select>

                        <label>Status</label>
                        <select name="status" value={formData.status} onChange={handleChange}>
                            <option value="activate">Activate</option>
                            <option value="inactivate">Inactivate</option>
                        </select>

                        <div className="modal-actions">
                            <button className="btn" onClick={editingUser ? handleUpdate : handleCreateUser}>
                                {editingUser ? 'Save Changes' : 'Create User'}
                            </button>
                            <button
                                className="btn delete"
                                onClick={() => {
                                    setEditingUser(null);
                                    setAddingUser(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsers;