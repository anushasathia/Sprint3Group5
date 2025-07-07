import { createContext, useContext, useState } from "react";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart
} from '../Services/api';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);

  return (
    <CartContext.Provider value={{ cart, setCart, order, setOrder }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
