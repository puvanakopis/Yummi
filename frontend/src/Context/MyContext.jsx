import { createContext, useState } from 'react';

export const MyContext = createContext();

export function MyContextProvider({ children }) {

  // ---------- View items ----------
  const [viewItem, setViewItem] = useState({});

  const showItem = (newItem) => {
    setViewItem(newItem);
  };


  // ---------- add to card ----------
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


  return (
    <MyContext.Provider value={{ viewItem, showItem, cardItems, addToCard , setCardItems}}>
      {children}
    </MyContext.Provider>
  );
}
