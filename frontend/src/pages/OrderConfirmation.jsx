import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  FiCheckCircle,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
} from "react-icons/fi";
import '../styles/OrderConfirmation.css';

const OrderConfirmation = ({ setPage }) => {
  const { order } = useCart();
  const [orderPlacedDate, setOrderPlacedDate] = useState(null);
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(null);

  useEffect(() => {
    if (order) {
      const now = new Date();
      setOrderPlacedDate(now);

      const offsetDays = Math.floor(Math.random() * 4) + 4; // 4-7 days
      const deliveryDate = new Date(now);
      deliveryDate.setDate(now.getDate() + offsetDays);
      setExpectedDeliveryDate(deliveryDate);
    }
  }, [order]);

  const formatDate = (date) =>
    date?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!order || !orderPlacedDate || !expectedDeliveryDate) {
    return (
      <div className="confirmation-container">
        <div className="no-order">
          <h2>No order found</h2>
          <p>It seems you haven't placed an order yet.</p>
          <button className="back-to-shop" onClick={() => setPage("add")}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-header">
        <div className="success-icon">
          <FiCheckCircle />
        </div>
        <h1>Order Confirmed!</h1>
        <p className="order-number">Order #: {order.orderNumber}</p>
        <p className="confirmation-message">
          Thank you for your purchase. We've sent a confirmation email to your address.
        </p>
      </div>

      <div className="order-timeline">
        <div className="timeline-step active">
          <div className="step-icon">
            <FiShoppingBag />
          </div>
          <div className="step-content">
            <h4>Order Placed</h4>
            <p>{formatDate(orderPlacedDate)}</p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="step-icon">
            <FiTruck />
          </div>
          <div className="step-content">
            <h4>Shipped</h4>
            <p>Expected by {formatDate(expectedDeliveryDate)}</p>
          </div>
        </div>

        <div className="timeline-step">
          <div className="step-icon">
            <FiCheckCircle />
          </div>
          <div className="step-content">
            <h4>Delivered</h4>
            <p>On its way to you</p>
          </div>
        </div>
      </div>

      <div className="order-details">
        <div className="detail-section">
          <h2>Order Summary</h2>
          <div className="order-items">
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-image">
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-meta">
                    Size: {item.selectedSize} | Qty: {item.quantity}
                  </p>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h2>Shipping Information</h2>
          <div className="shipping-info">
            <p><strong>{order.shipping.fullName}</strong></p>
            <p>{order.shipping.addressLine}</p>
            <p>
              {order.shipping.city}, {order.shipping.state} {order.shipping.pincode}
            </p>
            <p>Phone: {order.shipping.phoneNumber}</p>
          </div>
        </div>

        <div className="detail-section">
          <h2>Payment Information</h2>
          <div className="payment-info">
            <div className="payment-method">
              <FiCreditCard />
              <span>{order.payment}</span>
            </div>
            <div className="payment-total">
              <div className="total-row">
                <span>Subtotal:</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping:</span>
                <span>${order.shippingCost.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rewards-earned">
          <h3>Rewards Earned</h3>
          <div className="rewards-card">
            <div className="rewards-points">
              <span>{order.rewardPoints}</span> points
            </div>
            <p>
              You've earned {order.rewardPoints} reward points with this order.
              Redeem them on your next purchase!
            </p>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="btn btn-primary" onClick={() => setPage("add")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
