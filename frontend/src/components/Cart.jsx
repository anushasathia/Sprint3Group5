import React from "react";

function Cart({ cart, setCart }) {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const removeItem = (idToRemove) => {
    setCart(cart.filter(item => item.id !== idToRemove));
  };

  const updateQuantity = (idToUpdate, value) => {
    const newQuantity = Math.min(Math.max(1, value), 10); // Limit between 1-10
    setCart(
      cart.map(item =>
        item.id === idToUpdate ? { ...item, quantity: Number(newQuantity) } : item
      )
    );
  };

  const updateSize = (idToUpdate, newSize) => {
    setCart(
      cart.map(item =>
        item.id === idToUpdate ? { ...item, selectedSize: newSize } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  const getDeliveryDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="product-image-container">
                <img src={item.imageUrl} alt={item.name} className="product-image" />
              </div>

              <div className="product-details">
                <div className="product-header">
                  <h3 className="product-title">{item.name}</h3>
                  <p className="product-brand">by {item.brand || 'Generic Brand'}</p>
                </div>

                <div className="price-section">
                  <span className="current-price">₹{item.price.toFixed(2)}</span>
                  {item.originalPrice && (
                    <>
                      <span className="original-price">₹{item.originalPrice.toFixed(2)}</span>
                      {item.discount && (
                        <span className="discount">({item.discount}% OFF)</span>
                      )}
                    </>
                  )}
                </div>

                <div className="product-options">
                  <div className="option-row">
                    <label>Size:</label>
                    <select
                      value={item.selectedSize || 'M'}
                      onChange={(e) => updateSize(item.id, e.target.value)}
                      className="size-select"
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="option-row">
                    <label>Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, e.target.value)}
                      className="qty-input"
                    />
                  </div>

                  <div className="option-row">
                    <label>Status:</label>
                    <span className={item.stockStatus === 'Out of Stock' ? 'out-of-stock' : 'in-stock'}>
                      {item.stockStatus || 'In Stock'}
                    </span>
                  </div>

                  <div className="option-row">
                    <label>Delivery by:</label>
                    <span className="delivery-date">
                      {item.deliveryDays ? getDeliveryDate(item.deliveryDays) : 'Tomorrow'}
                    </span>
                  </div>
                </div>

                <div className="gift-option">
                  <input type="checkbox" id={`gift-${item.id}`} />
                  <label htmlFor={`gift-${item.id}`}>This will be a gift</label>
                </div>

                <div className="action-buttons">
                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
          ))}

         <div className="cart-summary">
           <div className="cart-total">
             <span className="total-label">Total Cart Subtotal:</span>
             <span className="total-amount">${calculateTotal()}</span>
           </div>

           <div className="cart-actions">
             <button
               className="checkout-btn"
               onClick={() => navigate('/checkout')} // Use your navigation method
             >
               Proceed to Checkout
             </button>
           </div>
         </div>
        </div>
      )}
    </div>
  );
}

export default Cart;