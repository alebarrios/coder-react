import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, quantity) => {
    const index = cart.findIndex((i) => i.item.id === item.id);
    if (index > -1) {
      const oldQy = cart[index].quantity;
      cart.splice(index, 1);
      setCart([...cart, { item, quantity: quantity + oldQy }]);
    } else {
      setCart([...cart, { item, quantity }]);
    }
  };

  const removeItem = (itemId) => {
    const newCart = cart.filter((item) => item.item.id !== itemId);
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};

