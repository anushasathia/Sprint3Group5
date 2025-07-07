import React from "react";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  const paymentMethods = [
    {
      id: "credit-card",
      name: "Credit Card",
      description: "Pay with Visa, Mastercard, or other cards"
    },
    {
      id: "upi",
      name: "UPI",
      description: "Pay using any UPI app like Google Pay, PhonePe"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      description: "Pay when you receive your order"
    }
  ];

  return (
    <div className="payment-options">
      {paymentMethods.map((method) => (
        <div
          key={method.id}
          className={`payment-option ${paymentMethod === method.name ? 'selected' : ''}`}
          onClick={() => setPaymentMethod(method.name)}
        >
          <div className="radio-btn">
            {paymentMethod === method.name && <div className="radio-inner"></div>}
          </div>
          <div className="payment-details">
            <h4>{method.name}</h4>
            <p>{method.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PaymentOptions;