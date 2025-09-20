import { createContext, useState } from 'react';

export const MyContext = createContext();

export function MyContextProvider({ children }) {

  // ---------- View items ----------
  const [viewItem, setViewItem] = useState({});
  const showItem = (newItem) => setViewItem(newItem);

  // ---------- Add to cart ----------
  const [cardItems, setCardItems] = useState([]);
  const addToCard = (item, quantity) => {
    const existingItemIndex = cardItems.findIndex(cartItem => cartItem.Name === item.Name);
    if (existingItemIndex !== -1) {
      const updatedItems = [...cardItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCardItems(updatedItems);
    } else {
      setCardItems(prevItems => [...prevItems, { ...item, quantity }]);
    }
  };

  // ---------- Favorites ----------
  const [favoriteItems, setFavoriteItems] = useState([]);
  const toggleFavorite = (item) => {
    const exists = favoriteItems.find(fav => fav.id === item.id);
    if (exists) {
      setFavoriteItems(favoriteItems.filter(fav => fav.id !== item.id));
    } else {
      setFavoriteItems([...favoriteItems, item]);
    }
  };

  const isFavorite = (item) => favoriteItems.some(fav => fav.id === item.id);

  // ---------- User Login ----------
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    if (email === "puvanakopis@gmail.com" && password === "123456") {
      setUser({ email });
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };
  const logout = () => setUser(null);

  return (
    <MyContext.Provider
      value={{
        viewItem,
        showItem,
        cardItems,
        addToCard,
        favoriteItems,
        toggleFavorite,
        isFavorite,
        user,
        login,
        logout
      }}
    >
      {children}
    </MyContext.Provider>
  );
}