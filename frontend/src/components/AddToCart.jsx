import React, { useState } from "react";

function AddToCart({ products, cart, setCart }) {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});

  const handleSizeChange = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleQuantityChange = (productId, value) => {
    const numValue = Math.max(1, Math.min(10, parseInt(value) || 1));
    setQuantities(prev => ({ ...prev, [productId]: numValue }));
  };

  const addToCart = (product) => {
    const productId = product.id;
    const size = selectedSizes[productId] || 'M'; // Default to 'M' if not selected
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

  return (
    <div className="product-page">
      {products.map(product => (
        <div className="product-card" key={product.id}>
          <div className="product-image-container">
            <img src={product.imageUrl} alt={product.name} className="product-image" />
          </div>

          <div className="product-details">
            <div className="product-header">
              <h1 className="product-name">{product.name}</h1>
              <p className="product-brand">by {product.brand || 'Generic Brand'}</p>
            </div>

            <div className="price-delivery">
              <div className="product-price">₹{product.price.toFixed(2)}</div>
              <div className="delivery-badge">Free Delivery</div>
            </div>

            <div className="selection-container">
              <div className="size-selection">
                <h3 className="section-title">Size:</h3>
                <select
                  value={selectedSizes[product.id] || 'M'}
                  onChange={(e) => handleSizeChange(product.id, e.target.value)}
                  className="size-dropdown"
                >
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div className="quantity-selection">
                <h3 className="section-title">Quantity:</h3>
                <div className="quantity-control">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="quantity-input"
                  />
                </div>
              </div>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AddToCart;