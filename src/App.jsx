import React, { useState, useEffect } from "react";
import AddToCart from "./components/AddToCart";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("add");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    setProducts([
      { id: 1, name: "Product A", price: 100, imageUrl: "https://placehold.co/100x100/ADD8E6/000000?text=" },
      { id: 2, name: "Product B", price: 200, imageUrl: "https://placehold.co/100x100/FFD700/000000?text=ProdB" },
      { id: 3, name: "Product C", price: 300, imageUrl: "https://placehold.co/100x100/C0C0C0/000000?text=ProdC" },
    ]);
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">E Commerce Cart and Checkout</div>
        <div className="nav-links">
          <button onClick={() => setPage("add")}>Add to Cart</button>
          <button onClick={() => setPage("cart")}>Cart</button>
          <button onClick={() => setPage("checkout")}>Checkout</button>
        </div>
      </nav>
      <main>
        {page === "add" && <AddToCart products={products} cart={cart} setCart={setCart} />}
        {page === "cart" && <Cart cart={cart} setCart={setCart} />}
        {page === "checkout" && (
          <Checkout cart={cart} setCart={setCart} setOrder={setOrder} setPage={setPage} />
        )}
        {page === "confirmation" && <OrderConfirmation order={order} />}
      </main>
    </div>
  );
}

export default App;