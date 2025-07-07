import React, { useState } from "react";
import Welcome from "./pages/Welcome";
import AddToCart from "./pages/AddToCart";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import "./styles/ecommerce.css";
import "./styles/Welcomepage.css";

function App() {
  const [page, setPage] = useState("welcome");
  const [transitioning, setTransitioning] = useState(false);

  const handleStartShopping = () => {
    setTransitioning(true);
    setTimeout(() => {
      setPage("add");
      setTransitioning(false);
    }, 800);
  };

  return (
    <CartProvider>
      <div className="app">
        {page !== "welcome" && <Navbar setPage={setPage} />}
        <div className={`page-container ${transitioning ? "transitioning" : ""}`}>
          {page === "welcome" ? (
            <Welcome onStartShopping={handleStartShopping} />
          ) : page === "add" ? (
            <AddToCart setPage={setPage} />
          ) : page === "cart" ? (
            <Cart setPage={setPage} />
          ) : page === "checkout" ? (
            <Checkout setPage={setPage} />
          ) : (
            <OrderConfirmation setPage={setPage} />
          )}
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
