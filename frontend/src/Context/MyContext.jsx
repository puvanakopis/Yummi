import { createContext, useState } from 'react';

export const MyContext = createContext();

export function MyContextProvider({ children }) {

  // ---------- View items ----------
  const [viewItem, setViewItem] = useState({});

  const showItem = (newItem) => {
    setViewItem(newItem);
  };

  // ---------- Add to cart ----------
  const [cardItems, setCardItems] = useState([])

  const addToCard = (item, quantity) => {
    // Check if the item is in the cart
    const existingItemIndex = cardItems.findIndex(cartItem => cartItem.Name === item.Name);

    if (existingItemIndex !== -1) {
      // If it is, update the quantity
      const updatedItems = [...cardItems];
      updatedItems[existingItemIndex].quantity += quantity;
      setCardItems(updatedItems);
    } else {
      // If not, add it with the specified quantity
      setCardItems((prevItems) => [
        ...prevItems,
        { ...item, quantity }
      ]);
    }
  };

  // ---------- User Login ----------
  const [user, setUser] = useState(null); // will store logged-in user info

  const login = (email, password) => {
    if (email === "puvanakopis@gmail.com" && password === "123456") {
      setUser({ email });
      return { success: true, message: "Login successful!" };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <MyContext.Provider 
      value={{ 
        viewItem, 
        showItem, 
        cardItems, 
        addToCard, 
        setCardItems,
        user,
        login,
        logout
      }}
    >
      {children}
    </MyContext.Provider>
  );
}
