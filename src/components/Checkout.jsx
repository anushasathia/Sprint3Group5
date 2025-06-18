import React, { useState } from "react";

function Checkout({ cart, setCart, setOrder, setPage }) {
  const [shipping, setShipping] = useState("");
  const [billing, setBilling] = useState("");
  const [payment, setPayment] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "SAVE10") setDiscount(0.1);
    else setDiscount(0);
  };

  const placeOrder = () => {
    setOrder({
      cart,
      shipping,
      billing,
      payment,
      total:
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
        (1 - discount),
    });
    setCart([]);
    setPage("confirmation");
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="form-section">
        <label>
          Shipping Address:
          <input
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            placeholder="Enter shipping address"
          />
        </label>
      </div>
      <div className="form-section">
        <label>
          Billing Address:
          <input
            value={billing}
            onChange={(e) => setBilling(e.target.value)}
            placeholder="Enter billing address"
          />
        </label>
      </div>
      <div className="form-section">
        <label>
          Payment Method:
          <input
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
            placeholder="e.g. UPI, Card, COD"
          />
        </label>
      </div>
      <div className="form-section promo-section">
        <label>
          Promo Code:
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="e.g. SAVE10"
          />
        </label>
        <button onClick={applyPromo}>Apply</button>
        {discount > 0 && <span className="promo-applied">Promo applied!</span>}
      </div>
      <div className="order-total">
        Total: ₹
        {cart
          .reduce((sum, item) => sum + item.price * item.quantity, 0)
          .toFixed(2) *
          (1 - discount)}
      </div>
      <button className="place-order-btn" onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}

export default Checkout;
