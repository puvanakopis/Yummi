import { createContext, useState } from 'react';
import axios from 'axios';

export const MyContext = createContext();

export function MyContextProvider({ children }) {
  const [viewItem, setViewItem] = useState({});
  const [cardItems, setCardItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [user, setUser] = useState(null);
 

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



  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      await axios.post('http://localhost:4000/api/auth/logout', {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

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
