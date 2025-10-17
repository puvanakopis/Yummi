import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const navigate = useNavigate();

  const [viewItem, setViewItem] = useState({});
  const [cardItems, setCardItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);



  axios.defaults.withCredentials = true;

  // Show item in view
  const showItem = (newItem) => setViewItem(newItem);

  // Add item to cart
  const addToCard = (item, quantity) => {
    const existingIndex = cardItems.findIndex(ci => ci.Name === item.Name);
    if (existingIndex !== -1) {
      const updated = [...cardItems];
      updated[existingIndex].quantity += quantity;
      setCardItems(updated);
    } else {
      setCardItems(prev => [...prev, { ...item, quantity }]);
    }
  };

  // Toggle favorite items
  const toggleFavorite = (item) => {
    const exists = favoriteItems.find(fav => fav.id === item.id);
    if (exists) {
      setFavoriteItems(favoriteItems.filter(fav => fav.id !== item.id));
    } else {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  const isFavorite = (item) => favoriteItems.some(fav => fav.id === item.id);

  // Logout
  const logout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout');
      setUser(null);
      localStorage.removeItem('user');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/auth/user');
        if (res.data.success) {
          setUser(res.data.user);
          localStorage.setItem('user', JSON.stringify(res.data.user));
        }
      } catch (err) {
        console.error('User fetch failed:', err.message);
      }
    };
    fetchUser();
  }, []);

  // Update localStorage on user change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Fetch user cart
  const fetchCart = async () => {
    if (!user?.id) return;

    try {
      const res = await axios.get(`http://localhost:4000/api/cart/${user.id}`);
      setCartItems(
        res.data.items.map(item => ({
          ...item.item,
          quantity: item.quantity,
          total: item.total,
          cartItemId: item._id,
        }))
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [cartItems]);

  return (
    <MyContext.Provider
      value={{
        viewItem, showItem,
        cardItems, addToCard, setCardItems,
        favoriteItems, toggleFavorite, isFavorite,
        user, logout, setUser,
        cartItems, setCartItems,
        loading, setLoading
      }}
    >
      {children}
    </MyContext.Provider>
  );
}