import React, { useState, useEffect } from "react";
import Welcome from "./components/welcome";
import AddToCart from "./components/AddToCart";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import './ecommerce.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("welcome");
  const [order, setOrder] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setProducts([
      // Hoodies & Sweatshirts (4 items)
      {
        id: 1,
        name: "Classic Hoodie",
        brand: "UrbanWear",
        price: 45.99,
        imageUrl: "https://placehold.co/300x300/8B4513/FFFFFF?text=Classic+Hoodie",
        category: "Hoodies & Sweatshirts"
      },
      {
        id: 2,
        name: "Pullover Sweatshirt",
        brand: "ComfyWear",
        price: 39.99,
        imageUrl: "https://placehold.co/300x300/696969/FFFFFF?text=Pullover+Sweatshirt",
        category: "Hoodies & Sweatshirts"
      },
      {
        id: 3,
        name: "Zip-Up Hoodie",
        brand: "StreetStyle",
        price: 49.99,
        imageUrl: "https://placehold.co/300x300/556B2F/FFFFFF?text=Zip-Up+Hoodie",
        category: "Hoodies & Sweatshirts"
      },
      {
        id: 4,
        name: "Graphic Hoodie",
        brand: "UrbanTrend",
        price: 54.99,
        imageUrl: "https://placehold.co/300x300/708090/FFFFFF?text=Graphic+Hoodie",
        category: "Hoodies & Sweatshirts"
      },

      // Coats & Jackets (5 items)
      {
        id: 5,
        name: "Leather Jacket",
        brand: "BikerStyle",
        price: 129.99,
        imageUrl: "https://placehold.co/300x300/000000/FFFFFF?text=Leather+Jacket",
        category: "Coats & Jackets"
      },
      {
        id: 6,
        name: "Winter Coat",
        brand: "ArcticWear",
        price: 149.99,
        imageUrl: "https://placehold.co/300x300/4682B4/FFFFFF?text=Winter+Coat",
        category: "Coats & Jackets"
      },
      {
        id: 7,
        name: "Denim Jacket",
        brand: "VintageLook",
        price: 79.99,
        imageUrl: "https://placehold.co/300x300/1E90FF/FFFFFF?text=Denim+Jacket",
        category: "Coats & Jackets"
      },
      {
        id: 8,
        name: "Bomber Jacket",
        brand: "UrbanStyle",
        price: 89.99,
        imageUrl: "https://placehold.co/300x300/2F4F4F/FFFFFF?text=Bomber+Jacket",
        category: "Coats & Jackets"
      },
      {
        id: 9,
        name: "Trench Coat",
        brand: "ClassicWear",
        price: 119.99,
        imageUrl: "https://placehold.co/300x300/D3D3D3/000000?text=Trench+Coat",
        category: "Coats & Jackets"
      },

      // Tees & T-Shirts (7 items)
      {
        id: 10,
        name: "Premium Cotton T-Shirt",
        brand: "FashionCo",
        price: 24.99,
        imageUrl: "https://placehold.co/300x300/ADD8E6/000000?text=Cotton+T-Shirt",
        category: "Tees & T-Shirts"
      },
      {
        id: 11,
        name: "V-Neck Tee",
        brand: "BasicWear",
        price: 19.99,
        imageUrl: "https://placehold.co/300x300/FFA07A/000000?text=V-Neck+Tee",
        category: "Tees & T-Shirts"
      },
      {
        id: 12,
        name: "Graphic T-Shirt",
        brand: "UrbanTrend",
        price: 29.99,
        imageUrl: "https://placehold.co/300x300/9370DB/FFFFFF?text=Graphic+T-Shirt",
        category: "Tees & T-Shirts"
      },
      {
        id: 13,
        name: "Polo Shirt",
        brand: "ClassicStyle",
        price: 34.99,
        imageUrl: "https://placehold.co/300x300/FFFFFF/000000?text=Polo+Shirt",
        category: "Tees & T-Shirts"
      },
      {
        id: 14,
        name: "Long Sleeve Tee",
        brand: "ComfyWear",
        price: 27.99,
        imageUrl: "https://placehold.co/300x300/F5DEB3/000000?text=Long+Sleeve+Tee",
        category: "Tees & T-Shirts"
      },
      {
        id: 15,
        name: "Oversized T-Shirt",
        brand: "StreetStyle",
        price: 31.99,
        imageUrl: "https://placehold.co/300x300/778899/FFFFFF?text=Oversized+T-Shirt",
        category: "Tees & T-Shirts"
      },
      {
        id: 16,
        name: "Athletic Tee",
        brand: "ActiveFit",
        price: 26.99,
        imageUrl: "https://placehold.co/300x300/000080/FFFFFF?text=Athletic+Tee",
        category: "Tees & T-Shirts"
      }
    ]);
  }, []);

  const handleStartShopping = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage("add");
      setIsTransitioning(false);
    }, 800);
  };

  const handleBackToWelcome = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setPage("welcome");
      setIsTransitioning(false);
    }, 800);
  };

  return (
    <div className="app">
      {page !== "welcome" && (
        <nav className="navbar">
          <div className="logo">E Commerce Cart</div>
          <div className="nav-links">
            <button onClick={() => setPage("add")}>Products</button>
            <button onClick={() => setPage("cart")}>Cart ({cart.length})</button>
            <button onClick={() => setPage("checkout")}>Checkout</button>
          </div>
        </nav>
      )}

      <div className={`page-container ${isTransitioning ? 'transitioning' : ''}`}>
        {page === "welcome" ? (
          <Welcome onStartShopping={handleStartShopping} />
        ) : page === "add" ? (
          <AddToCart products={products} cart={cart} setCart={setCart} onBack={handleBackToWelcome} />
        ) : page === "cart" ? (
          <Cart cart={cart} setCart={setCart} setPage={setPage} />
        ) : page === "checkout" ? (
          <Checkout cart={cart} setCart={setCart} setOrder={setOrder} setPage={setPage} />
        ) : (
          <OrderConfirmation order={order} setPage={setPage} />
        )}
      </div>
    </div>
  );
}

export default App;