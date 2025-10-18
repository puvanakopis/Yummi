import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const navigate = useNavigate();

  // Logged In User
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

  // Favorite Items
  const [favoriteItems, setFavoriteItems] = useState([]);

  const [viewItem, setViewItem] = useState({});
  const [loading, setLoading] = useState(true);

  axios.defaults.withCredentials = true;

  const API_URL = 'http://localhost:4000/api';



  // ---------------- Logged In User ----------------
  const createUser = async (data) => {
    try {
      await axios.post(`${API_URL}/auth/register`, data);
      getAllUsers();
    } catch (err) {
      console.error('Error creating user:', err);
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





  // ---------------- Items ----------------
  const getItems = async () => {
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

  const addItems = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/items`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setItems(prev => [...prev, res.data.item]);
    } catch (err) {
      console.error('Error adding item:', err);
      throw err;
    }
  };

  const getOneItem = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/items/${id}`);
      return res.data.item;
    } catch (err) {
      console.error('Failed to fetch item details:', err);
      return null;
    }
  };

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

  const deleteItems = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      setItems(items.filter(p => p._id !== id));
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };




  // ---------------- All Users ----------------
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`${API_URL}/users/${id}`);
        getAllUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
      }
    }
  };

  const updateUser = async (id, data) => {
    try {
      await axios.put(`${API_URL}/users/${id}`, data);
      getAllUsers();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const updateUserStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === 'activate' ? 'inactivate' : 'activate';
      await axios.put(`${API_URL}/users/${id}`, { status: newStatus });
      getAllUsers();
    } catch (err) {
      console.error('Error updating user status:', err);
    }
  };



  // ---------------- Orders ----------------
  const getAllOrders = async () => {
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/orders/status/${orderId}`, { status: newStatus }, { withCredentials: true });
      getAllOrders();
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update order status');
    }
  };



  // ---------------- Favorites ----------------
  const toggleFavorite = (item) => {
    const exists = favoriteItems.find(fav => fav._id === item._id);
    if (exists) {
      setFavoriteItems(favoriteItems.filter(fav => fav._id !== item._id));
    } else {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  const isFavorite = (item) => favoriteItems.some(fav => fav._id === item._id);






  // ---------------- cart ----------------
  const fetchCart = async () => {
    try {
      setCartLoading(true);
      const res = await axios.get(
        `http://localhost:4000/api/cart/${loggedInUser.id}`
      );
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setCartLoading(false);
    }
  };


  const removeItem = async (itemId) => {
    try {
      await axios.delete("http://localhost:4000/api/cart/delete", {
        data: { userId: loggedInUser.id, itemId },
      });

      setCartItems((prev) =>
        prev.filter((item) => {
          const id = typeof item.item === "object" ? item.item._id : item.item;
          return id !== itemId;
        })
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await axios.put("http://localhost:4000/api/cart/update", {
        userId: loggedInUser.id,
        itemId,
        quantity: newQuantity,
      });

      setCartItems((prev) =>
        prev.map((item) => {
          const id = typeof item.item === "object" ? item.item._id : item.item;
          if (id === itemId) {
            const updatedItem = res.data.cart.items.find(
              (i) => i.item === itemId
            );
            return {
              ...item,
              quantity: updatedItem.quantity,
              total: updatedItem.total,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };




  // ----------- Place Order -----------



  // ---------------- Effects ----------------
  useEffect(() => {
    getAllUsers();
    getItems();
    getAllOrders();
    fetchCart();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser');
    }
  }, [loggedInUser]);

  return (
    <MyContext.Provider
      value={{
        removeItem, updateQuantity,
        cartLoading, setCartLoading,
        cartItems,
        setCartItems,
        users,
        setUsers,
        viewItem,
        setViewItem,
        loggedInUser,
        setLoggedInUser,
        loading,
        setLoading,
        getAllUsers,
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
        getItems,
        addItems,
        updateItems,
        deleteItems,
        getOneItem,
        orders,
        ordersLoading,
        getAllOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
