import React from "react";

function Cart({ cart, setCart }) {
  const removeItem = (idToRemove) => {
    setCart(
      cart.map((item) => {
        if (item.id === idToRemove) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      }).filter(Boolean)
    );
  };

  const updateQuantity = (idToUpdate, value) => {
    if (value < 1) return;
    setCart(
      cart.map((item) =>
        item.id === idToUpdate ? { ...item, quantity: Number(value) } : item
      )
    );
  };
  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      <div className="cart-list">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="product-image" />
            <div style={{ flexGrow: 1, marginLeft: '10px' }}>
              <span className="product-title">{item.name}</span>
              <span className="product-price">
                ₹{item.price.toFixed(2)} x
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, e.target.value)}
                  className="qty-input"
                />
              </span>
            </div>
            <button className="remove-btn" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="cart-total">
          Total: ₹{calculateTotal()}
        </div>
      )}
    </div>
  );
}

export default Cart;
