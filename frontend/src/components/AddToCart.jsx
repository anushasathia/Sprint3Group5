import React, { useState, useRef } from "react";

function AddToCart({ products, cart, setCart, onBack }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Create a ref for the products section
  const productsSectionRef = useRef(null);

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = Math.max(1, Math.min(10, parseInt(value) || 1));
    setQuantities(prev => ({ ...prev, [productId]: numValue }));
  };

  const addToCart = (product) => {
    const productId = product.id;
    const size = selectedSizes[productId] || 'M';
    const quantity = quantities[productId] || 1;

    const existingItemIndex = cart.findIndex(
      item => item.id === productId && item.selectedSize === size
    );

    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
          selectedSize: size,
          deliveryDays: Math.floor(Math.random() * 5) + 3
        }
      ]);
    }
  };

  // Function to handle shop now button click
  const handleShopNow = () => {
    setSelectedCategory("All");
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="products-page">
      {/* Hero Banner Section */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>FASHION</h1>
          <h2>LET'S EXPLORE UNIQUE CLOTHES</h2>
          <p>Live for influential and innovative fashion!</p>
          <button className="shop-now-btn" onClick={handleShopNow}>
            SHOP NOW
          </button>
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="new-arrivals">
        <h2>NEW ARRIVALS</h2>
        <div className="arrival-categories">
          <div
            className={`category-card ${selectedCategory === "Hoodies & Sweatshirts" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Hoodies & Sweatshirts")}
          >
            <h3>Hoodies & Sweatshirts</h3>
            <p>Exclusive Designs</p>
          </div>
          <div
            className={`category-card ${selectedCategory === "Coats & Jackets" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Coats & Jackets")}
          >
            <h3>Coats & Jackets</h3>
            <p>Explore Now</p>
          </div>
          <div
            className={`category-card ${selectedCategory === "Tees & T-Shirts" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Tees & T-Shirts")}
          >
            <h3>Tees & T-Shirts</h3>
            <p>Explore Now</p>
          </div>
          <div
            className={`category-card ${selectedCategory === "All" ? "active" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            <h3>All Products</h3>
            <p>View All</p>
          </div>
        </div>
      </div>

      {/* All Products Section with ref */}
      <div className="all-products" ref={productsSectionRef}>
        <h2>{selectedCategory === "All" ? "All Products" : selectedCategory}</h2>
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <div className="product-image-container">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="rating">★★★★☆</div>
              </div>

              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-brand">{product.brand}</div>
                <div className="product-price">${product.price.toFixed(2)}</div>

                <div className="product-actions">
                  <select
                    value={selectedSizes[product.id] || 'M'}
                    onChange={(e) => handleSizeChange(product.id, e.target.value)}
                    className="size-dropdown"
                  >
                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>

                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddToCart;