import React from "react";

const Confirmation = ({ order }) => {
  if (!order || !order.items) {
    return (
      <div className="confirmation-container">
        <div className="no-order-message">
          <h2>Order Not Found</h2>
          <p>Please check your order history or return to the store.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <h1>Thank You for Your Order!</h1>
        <p className="order-number">Order #: {order.orderNumber}</p>
        <p>Your order has been confirmed and will be shipped soon.</p>
      </div>

      <div className="order-details-section">
        <h2>Order Summary</h2>
        <p className="order-date">Order Placed: {order.orderDate}</p>

        <div className="order-items">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</p>
                <p className="item-price">Price: ₹{item.price.toFixed(2)}</p>
              </div>
              <p className="delivery-date">Delivery by: {item.deliveryDate}</p>
              {index !== order.items.length - 1 && <hr className="divider" />}
            </div>
          ))}
        </div>
      </div>

      <div className="price-summary">
        <div className="price-row">
          <span>Subtotal:</span>
          <span>₹{order.subtotal.toFixed(2)}</span>
        </div>
        {order.discount > 0 && (
          <div className="price-row discount">
            <span>Discount:</span>
            <span>-₹{order.discount.toFixed(2)}</span>
          </div>
        )}
        <div className="price-row total">
          <span>Total:</span>
          <span>₹{order.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="shipping-info">
        <h3>Shipping Information</h3>
        <div className="address-card">
          <h4>{order.shipping.fullName}</h4>
          <p>{order.shipping.addressLine}</p>
          <p>{order.shipping.city}, {order.shipping.state} - {order.shipping.pincode}</p>
          <p>Phone: {order.shipping.phoneNumber}</p>
        </div>
      </div>

      <div className="payment-info">
        <h3>Payment Method</h3>
        <p>{order.payment}</p>
      </div>

      <div className="rewards-section">
        <h3>Rewards Earned</h3>
        <p>You've earned <span className="reward-points">{order.rewardPoints} points</span> on this order!</p>
        <p>Redeem them on your next purchase.</p>
      </div>
    </div>
  );
};

export default Confirmation;