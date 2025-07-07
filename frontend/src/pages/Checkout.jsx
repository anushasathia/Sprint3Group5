import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import AddressCard from "../components/Address";
import '../styles/Checkout.css';

const Checkout = ({ setPage }) => {
  const { cart, setCart, setOrder } = useCart();
  const [activeStep, setActiveStep] = useState(1);

  const [address, setAddress] = useState({
    fullName: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    phoneNumber: "",
    email: ""
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [saveAddress, setSaveAddress] = useState(true);
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: 1,
      fullName: "Siddharth Nayak",
      addressLine: "Plot No. 145, Sailashree Vihar, Chandrasekharpur",
      city: "Bhubaneswar",
      state: "Odisha",
      pincode: "751023",
      phoneNumber: "9437001234",
      email: "siddharth@gmail.com",
      isDefault: true
    },
    {
      id: 2,
      fullName: "Priya Sahoo",
      addressLine: "D-12, KIIT Campus, Patia",
      city: "Bhubaneswar",
      state: "Odisha",
      pincode: "751024",
      phoneNumber: "9861034567",
      email: "priya11@gmail.com",
      isDefault: false
    }
  ]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;

  useEffect(() => {
    const defaultAddress = savedAddresses.find(addr => addr.isDefault);
    if (defaultAddress && !selectedAddressId) {
      setSelectedAddress(defaultAddress);
      setSelectedAddressId(defaultAddress.id);
    }
  }, [savedAddresses, selectedAddressId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (addressData) => {
    setSelectedAddressId(addressData.id);
    setSelectedAddress(addressData);
    setShowAddressForm(false);
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
    setSelectedAddressId(null);
    setSelectedAddress(null);
    setAddress({
      fullName: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
      phoneNumber: "",
      email: ""
    });
  };

  const handleUseThisAddress = () => {
    const newAddress = {
      ...address,
      id: Date.now(),
      isDefault: false
    };
    if (saveAddress) {
      setSavedAddresses(prev => [...prev, newAddress]);
    }
    setSelectedAddress(newAddress);
    setSelectedAddressId(newAddress.id);
    setShowAddressForm(false);
  };

  const validateStep1 = () => {
    if (selectedAddress) return true;
    if (showAddressForm) {
      return Object.values(address).every(value => value.trim() !== "");
    }
    return false;
  };

  const handleOrder = () => {
    if (!selectedAddress && !validateStep1()) {
      alert("Please provide a valid shipping address");
      setActiveStep(1);
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      setActiveStep(2);
      return;
    }

    const shippingAddress = selectedAddress || address;
    const order = {
      orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
      orderDate: new Date().toLocaleString(),
      items: cart.map(item => ({
        ...item,
        deliveryDate: new Date(Date.now() + 5 * 86400000).toLocaleDateString()
      })),
      shipping: shippingAddress,
      payment: paymentMethod,
      subtotal: parseFloat(subtotal.toFixed(2)),
      shippingCost: shipping,
      total: parseFloat(total.toFixed(2)),
      rewardPoints: Math.floor(subtotal / 100) * 10
    };

    setOrder(order);
    setCart([]);
    setPage("confirmation");
  };

  const renderAddressForm = () => (
    <div className="address-form">
      <h4>Enter New Address</h4>
      {["fullName", "addressLine", "city", "state", "pincode", "phoneNumber", "email"].map((field) => (
        <div className="form-group" key={field}>
          <label>{field.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={address[field]}
            onChange={handleInputChange}
            required
          />
        </div>
      ))}
      <div className="save-address">
        <input type="checkbox" id="saveAddress" checked={saveAddress} onChange={() => setSaveAddress(!saveAddress)} />
        <label htmlFor="saveAddress">Save this address for future</label>
      </div>
      <div className="form-actions">
        <button className="cancel-btn" onClick={() => setShowAddressForm(false)}>Cancel</button>
        <button className="use-address-btn" onClick={handleUseThisAddress} disabled={!validateStep1()}>
          Use This Address
        </button>
      </div>
    </div>
  );

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <div className="checkout-steps">
          {["Shipping", "Payment", "Review"].map((step, i) => (
            <div className={`step ${activeStep === i + 1 ? 'active' : ''}`} key={i}>
              <span>{i + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {activeStep === 1 && (
        <div className="checkout-step">
          <h3>Select Shipping Address</h3>
          <div className="saved-addresses">
            {savedAddresses.map(addr => (
              <AddressCard
                key={addr.id}
                address={addr}
                isDefault={addr.isDefault}
                selected={selectedAddressId === addr.id}
                onClick={() => handleAddressSelect(addr)}
              />
            ))}
          </div>

          <button className="add-new-address-btn" onClick={handleAddNewAddress}>
            + Add New Address
          </button>
          {showAddressForm && renderAddressForm()}
          <div className="step-actions">
            <button
              className="next-btn"
              onClick={() => setActiveStep(2)}
              disabled={!validateStep1()}
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {activeStep === 2 && (
        <div className="checkout-step">
          <h3>Payment Method</h3>
          <div className="payment-options">
            {["Credit Card", "UPI", "Cash on Delivery"].map((method) => (
              <div
                key={method}
                className={`payment-option ${paymentMethod === method ? 'selected' : ''}`}
                onClick={() => setPaymentMethod(method)}
              >
                <div className="radio-btn">
                  {paymentMethod === method && <div className="radio-inner"></div>}
                </div>
                <div className="payment-details">
                  <h4>{method}</h4>
                  <p>
                    {method === "Credit Card"
                      ? "Pay with Visa, Mastercard, or other cards"
                      : method === "UPI"
                        ? "Pay using any UPI app like Google Pay, PhonePe"
                        : "Pay when you receive your order"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="step-actions">
            <button className="back-btn" onClick={() => setActiveStep(1)}>
              Back
            </button>
            <button
              className="next-btn"
              onClick={() => setActiveStep(3)}
              disabled={!paymentMethod}
            >
              Review Order
            </button>
          </div>
        </div>
      )}

      {activeStep === 3 && (
        <div className="checkout-step">
          <h3>Order Summary</h3>
          <div className="order-review">
            <div className="shipping-review">
              <h4>Shipping Address</h4>
              {selectedAddress || address ? (
                <>
                  <p>{(selectedAddress || address).fullName}</p>
                  <p>{(selectedAddress || address).addressLine}</p>
                  <p>{(selectedAddress || address).city}, {(selectedAddress || address).state} {(selectedAddress || address).pincode}</p>
                  <p>Phone: {(selectedAddress || address).phoneNumber}</p>
                  <p>Email: {(selectedAddress || address).email}</p>
                </>
              ) : null}
            </div>

            <div className="payment-review">
              <h4>Payment Method</h4>
              <p>{paymentMethod}</p>
            </div>

            <div className="order-items">
              <h4>Your Order ({cart.length} items)</h4>
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

          <div className="step-actions">
            <button className="back-btn" onClick={() => setActiveStep(2)}>
              Back
            </button>
            <button className="place-order-btn" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;