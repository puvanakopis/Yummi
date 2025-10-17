import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const navigate = useNavigate();

  // Log in User
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const stored = localStorage.getItem('loggedInUser');
    return stored ? JSON.parse(stored) : null;
  });

  // All Users 
  const [users, setUsers] = useState([]);

  // Cart Items
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);


  // All Items
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);

  // Orders
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Favorites Items
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [viewItem, setViewItem] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const API_URL = 'http://localhost:4000/api';



  // ---------------- Logged In User ----------------
  const fetchLoggedInUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/user`);
      if (res.data.success) {
        setLoggedInUser(res.data.user);
        localStorage.setItem('loggedInUser', JSON.stringify(res.data.user));
      }
    } catch (err) {
      console.error('User fetch failed:', err.message);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`);
      setLoggedInUser(null);
      localStorage.removeItem('loggedInUser');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };



  // ---------------- All Users ----------------
  // Fetch All User
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // Update User
  const updateUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'activate' ? 'inactivate' : 'activate';
      await axios.put(`${API_URL}/users/${id}`, { status: newStatus });
      fetchUsers();
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  // Create User
  const createUser = async (data) => {
    try {
      await axios.post(`${API_URL}/auth/register`, data);
      fetchUsers();
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };


  // Update User
  const updateUser = async (id, data) => {
    try {
      await axios.put(`${API_URL}/users/${id}`, data);
      fetchUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };






  // ---------------- Cart ----------------
  // Fetch Cart Item
  const fetchCart = async () => {
    if (!loggedInUser?.id) return;
    try {
      setCartLoading(true);
      const res = await axios.get(`${API_URL}/cart/${loggedInUser.id}`);
      setCartItems(
        res.data.items.map(item => ({
          ...item.item,
          quantity: item.quantity,
          total: item.total,
          cartItemId: item._id,
        }))
      );
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setCartLoading(false);
    }
  };


  // Add Item in Cart
  const addToCart = (item, quantity) => {
    const existingIndex = cartItems.findIndex(ci => ci.Name === item.Name);
    if (existingIndex !== -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems(prev => [...prev, { ...item, quantity }]);
    }
  };




  // ---------------- Items ----------------
  // Fecth Items
  const fetchItems = async () => {
    try {
      setItemsLoading(true);
      const res = await axios.get(`${API_URL}/items`);
      setItems(res.data.items || []);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setItemsLoading(false);
    }
  };

  // add Items
  const addItems = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/items`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setItems([...items, res.data.item]);
    } catch (err) {
      console.error('Error adding item:', err);
      throw err;
    }
  };

  // Update Item
  const updateItems = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/items/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setItems(items.map(p => (p._id === id ? res.data.item : p)));
    } catch (err) {
      console.error('Error updating item:', err);
      throw err;
    }
  };

  // Delete Item
  const deleteItems = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(items.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  // Fetch Item Details
  const fetchItemsDetails = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/items/${id}`);
      return res.data.item;
    } catch (err) {
      console.error('Failed to fetch item details:', err);
      return null;
    }
  };



  // ---------------- Favorites ----------------
  const toggleFavorite = (item) => {
    const exists = favoriteItems.find(fav => fav.id === item.id);
    if (exists) {
      setFavoriteItems(favoriteItems.filter(fav => fav.id !== item.id));
    } else {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  const isFavorite = (item) => favoriteItems.some(fav => fav.id === item.id);




  // ----------- Create Place Order -----------
  const placeOrder = async (deliveryInfo) => {
    if (!loggedInUser || !loggedInUser.id) {
      alert("Please log in before placing an order.");
      return false;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return false;
    }

    try {
      const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
      const deliveryFee = 300;
      const grandTotal = subtotal + deliveryFee;

      const items = cartItems.map((item) => ({
        item: item._id,
        quantity: item.quantity,
        total: item.total,
      }));

      const orderData = {
        items,
        subtotal,
        deliveryFee,
        grandTotal,
        deliveryInfo,
      };

      const response = await axios.post(
        `${API_URL}/orders/${loggedInUser.id}`,
        orderData
      );

      if (response.status === 201) {
        await axios.delete(`${API_URL}/cart/delete-all`, {
          data: { userId: loggedInUser.id },
        });
        setCartItems([]);
        alert("Your order has been placed successfully!");
        return true;
      } else {
        alert("Something went wrong while placing the order.");
        return false;
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to place order. Please try again later.");
      return false;
    }
  };

  // ---------------- Orders ----------------
  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      const res = await axios.get(`${API_URL}/orders`, { withCredentials: true });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/orders/status/${orderId}`, { status: newStatus }, { withCredentials: true });
      fetchOrders();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update order status');
    }
  };




  // ---------------- Effects ----------------
  useEffect(() => {
    fetchUsers();
    fetchLoggedInUser();
    fetchItems();
    fetchOrders();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      fetchCart();
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }, [loggedInUser]);

  return (
    <MyContext.Provider
      value={{
        placeOrder,
        cartLoading, setCartLoading,
        users, setUsers,
        viewItem, setViewItem,
        loggedInUser, setLoggedInUser,
        cartItems, setCartItems,
        addToCart,
        loading, setLoading,
        fetchUsers,
        updateUserStatus,
        deleteUser,
        createUser,
        updateUser,

        favoriteItems,
        toggleFavorite,
        isFavorite,
        logout,
        items,
        itemsLoading,
        fetchItems,
        addItems,
        updateItems,
        deleteItems,
        fetchItemsDetails,

        orders,
        ordersLoading,
        fetchOrders,
        handleStatusChange,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}