import React from "react";
import { useCart } from "../context/CartContext";
import { FiTrash2, FiChevronUp, FiChevronDown } from "react-icons/fi";
import '../styles/Cart.css';
// import { getCartData } from "../Service/api.js"

const Cart = ({ setPage }) => {
  const { cart, setCart } = useCart();

  const updateQuantity = (id, newQuantity) => {
    const quantity = Math.max(1, Math.min(10, newQuantity));
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const incrementQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.min(10, item.quantity + 1) } : item
    ));
  };

  const decrementQuantity = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const shipping = total > 50 ? 0 : 5.99;
  const grandTotal = (parseFloat(total) + shipping).toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Shopping Bag</h2>
        <p>{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>                    </p>
          <button className="continue-shopping" onClick={() => setPage("add")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                <div className="product-image-container">
                  <img src={item.imageUrl} alt={item.name} className="product-image" />
                </div>

                <div className="product-info">
                  <div className="product-header">
                    <h3>{item.name}</h3>
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>

                  <p className="product-brand">{item.brand}</p>
                  <p className="product-price">${item.price.toFixed(2)}</p>

                  <div className="product-options">
                    <div className="option">
                      <span>Size:</span>
                      <select
                        value={item.selectedSize}
                        onChange={e => updateSize(item.id, e.target.value)}
                      >
                        {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>

                    <div className="option">
                      <span>Quantity:</span>
                      <div className="quantity-selector">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          <FiChevronDown />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          disabled={item.quantity >= 10}
                        >
                          <FiChevronUp />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${total}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>

            <button
              className="checkout-btn"
              onClick={() => setPage("checkout")}
            >
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping"
              onClick={() => setPage("add")}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;