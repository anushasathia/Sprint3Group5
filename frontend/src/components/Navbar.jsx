import React from "react";
import { useCart } from "../context/CartContext";

const Navbar = ({ setPage }) => {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="logo">E-Commerce Cart</div>
      <div className="nav-links">
        <button onClick={() => setPage("add")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart ({cart.length})</button>
        <button onClick={() => setPage("checkout")}>Checkout</button>
      </div>
    </nav>
  );
};

export default Navbar;