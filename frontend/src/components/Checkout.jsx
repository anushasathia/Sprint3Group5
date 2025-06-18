import React, { useState } from "react";

function Checkout({ cart, setCart, setOrder, setPage }) {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      fullName: "Ravi Kumar",
      addressLine: "101, Green View Apartments, Sector 22",
      city: "Gurgaon",
      state: "Haryana",
      pincode: "122016",
      phoneNumber: "9876543210"
    },
    {
      id: 2,
      fullName: "Rashmi Kumari",
      addressLine: "456 Oak Avenue, Floor 2",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      phoneNumber: "8765432109"
    }
  ]);

  const paymentMethods = [
    "Credit/Debit Card",
    "Wallet Rewards",
    "Net Banking",
    "UPI & Other Apps",
    "EMI (Easy Installments)",
    "Cash on Delivery"
  ];

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "SAVE10") {
      setDiscount(0.1);
      alert("Promo code applied! 10% discount added.");
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveNewAddress = () => {
    const newAddressWithId = {
      ...newAddress,
      id: savedAddresses.length + 1
    };

    setSavedAddresses(prev => [...prev, newAddressWithId]);
    setSelectedAddress(newAddressWithId);
    setShowNewAddressForm(false);
    setNewAddress({
      fullName: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      phoneNumber: ""
    });
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setIsPlacingOrder(true);

    try {
      const today = new Date();
      const deliveryDates = cart.map((item, index) => {
        const deliveryDays = 3 + Math.floor(index % 5);
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + deliveryDays);
        return deliveryDate.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      });

      const orderItems = cart.map((item, index) => ({
        name: item.name,
        size: item.size || 'One Size',
        color: item.color || 'Standard',
        quantity: item.quantity,
        price: item.price,
        deliveryDate: deliveryDates[index] || "Within 5-7 business days"
      }));

      const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const rewardPoints = Math.floor(subtotal / 100) * 10;

      setOrder({
        items: orderItems,
        shipping: selectedAddress,
        billing: selectedAddress,
        payment: paymentMethod,
        subtotal: subtotal,
        discount: subtotal * discount,
        total: subtotal * (1 - discount),
        rewardPoints: rewardPoints,
        orderDate: new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`
      });

      setCart([]);
      setPage("confirmation");
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout - Billing & Payment</h2>

      <div className="address-section">
        <h3>Billing Address</h3>

        {selectedAddress ? (
          <div className="selected-address-preview">
            <h4>Selected Address:</h4>
            <div className="address-card selected">
              <h4>{selectedAddress.fullName}</h4>
              <p>{selectedAddress.addressLine}</p>
              <p>{selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}</p>
              <p>Phone: {selectedAddress.phoneNumber}</p>
              <p className="deliver-here">Deliver to this address</p>
            </div>
          </div>
        ) : (
          <p className="no-address-selected">No address selected</p>
        )}

        <div className="address-options">
          <h4>Choose another address:</h4>
          {savedAddresses
            .filter(address => !selectedAddress || address.id !== selectedAddress.id)
            .map(address => (
              <div
                key={address.id}
                className="address-card"
                onClick={() => setSelectedAddress(address)}
              >
                <h4>{address.fullName}</h4>
                <p>{address.addressLine}</p>
                <p>{address.city}, {address.state} - {address.pincode}</p>
                <p>Phone: {address.phoneNumber}</p>
              </div>
            ))}
        </div>

        <button
          className="add-address-btn"
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
        >
          + Add New Address
        </button>

        {showNewAddressForm && (
          <div className="new-address-form">
            <h4>Add New Address</h4>
            <input
              name="fullName"
              value={newAddress.fullName}
              onChange={handleNewAddressChange}
              placeholder="Full Name"
              required
            />
            <input
              name="addressLine"
              value={newAddress.addressLine}
              onChange={handleNewAddressChange}
              placeholder="Address Line"
              required
            />
            <input
              name="city"
              value={newAddress.city}
              onChange={handleNewAddressChange}
              placeholder="City"
              required
            />
            <input
              name="state"
              value={newAddress.state}
              onChange={handleNewAddressChange}
              placeholder="State"
              required
            />
            <input
              name="pincode"
              value={newAddress.pincode}
              onChange={handleNewAddressChange}
              placeholder="Pincode"
              required
            />
            <input
              name="phoneNumber"
              value={newAddress.phoneNumber}
              onChange={handleNewAddressChange}
              placeholder="Phone Number"
              required
            />
            <button onClick={saveNewAddress}>Save and Deliver Here</button>
          </div>
        )}
      </div>

      <div className="promo-section">
        <h3>Enter Promo Code</h3>
        <div className="promo-input-group">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Enter promo code"
          />
          <button onClick={applyPromo}>Apply</button>
        </div>
        {discount > 0 && (
          <div className="promo-applied">
            Promo code applied! ({discount * 100}% discount)
          </div>
        )}
      </div>

      <div className="payment-section">
        <h3>Select Payment Method</h3>
        <div className="payment-options">
          {paymentMethods.map((method) => (
            <div key={method} className="payment-option">
              <input
                type="radio"
                id={method}
                name="paymentMethod"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
              />
              <label htmlFor={method}>{method}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="order-summary">
        <div className="order-total">
          <span>Order Total:</span>
          <span>
            ₹{(cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * (1 - discount)).toFixed(2)}
          </span>
        </div>
        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default Checkout;