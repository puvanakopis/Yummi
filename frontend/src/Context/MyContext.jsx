import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const navigate = useNavigate()
  
  const [viewItem, setViewItem] = useState({});
  const [cardItems, setCardItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  axios.defaults.withCredentials = true;

  // ------------ Helper Functions ------------
  const showItem = (newItem) => setViewItem(newItem);

  const addToCard = (item, quantity) => {
    const existingItemIndex = cardItems.findIndex(ci => ci.Name === item.Name);
    if (existingItemIndex !== -1) {
      const updatedItems = [...cardItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCardItems(updatedItems);
    } else {
      setCardItems(prev => [...prev, { ...item, quantity }]);
    }
  };

  const toggleFavorite = (item) => {
    const exists = favoriteItems.find(fav => fav.id === item.id);
    if (exists) {
      setFavoriteItems(favoriteItems.filter(fav => fav.id !== item.id));
    } else {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  const isFavorite = (item) => favoriteItems.some(fav => fav.id === item.id);

  // ------------ Logout Function ------------
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

  // ------------ Fetch Logged User Info on Load ------------
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

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);




  return (
    <MyContext.Provider
      value={{
        viewItem, showItem,
        cardItems, addToCard, setCardItems,
        favoriteItems, toggleFavorite, isFavorite,
        user, logout, setUser
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
