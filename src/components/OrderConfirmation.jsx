import React from "react";

function OrderConfirmation({ order }) {
  if (!order)
    return (
      <div className="container">
        <h2>Order Confirmation</h2>
        <p>No order placed.</p>
      </div>
    );
  return (
    <div className="container">
      <h2>Order Confirmation</h2>
      <div className="order-info">
        <div>
          <strong>Shipping Address:</strong> {order.shipping}
        </div>
        <div>
          <strong>Billing Address:</strong> {order.billing}
        </div>
        <div>
          <strong>Payment Method:</strong> {order.payment}
        </div>
        <div className="order-total">
          <strong>Order Total:</strong> ₹{order.total.toFixed(2)}
        </div>
      </div>
      <div>
        <h3>Items:</h3>
        <ul>
          {order.cart.map((item, idx) => (
            <li
              key={item.id || idx} 
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                gap: '10px' 
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '4px' 
                }}
              />
              {item.name} - ₹{item.price.toFixed(2)} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div className="thank-you">Thank you for your order!</div>
    </div>
  );
}

export default OrderConfirmation;
