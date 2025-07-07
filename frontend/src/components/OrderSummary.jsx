import React from "react";

const OrderSummary = ({ cart, subtotal, shipping, total }) => {
  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      <div className="order-items">
        {cart.map(item => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img src={item.imageUrl} alt={item.name} />
            </div>
            <div className="item-details">
              <h5>{item.name}</h5>
              <p>Size: {item.selectedSize} | Qty: {item.quantity}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-totals">
        <div className="total-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="total-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="total-row grand-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;