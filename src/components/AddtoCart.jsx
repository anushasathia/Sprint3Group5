// AddToCart.jsx
import React from "react";

function AddToCart({ products, cart, setCart }) {
  const addToCart = (product) => {
    // If already in cart, increase quantity
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="container">
      <h2>Add to Cart</h2>
      {products.length === 0 && <p>Loading products...</p>}
      <div className="product-list">
        {products.map((p) => (
          <div className="product-card" key={p.id}>
            <img src={p.imageUrl} alt={p.name} className="product-image" /> {/* */}
            <div>
              <div className="product-title">{p.name}</div>
              <div className="product-price">₹{p.price}</div>
            </div>
            <button onClick={() => addToCart(p)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AddToCart;