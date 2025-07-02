// components/Address.jsx
import React from "react";
import { FiHome, FiPhone } from "react-icons/fi";

const AddressCard = ({ address, isDefault = false, selected = false, onClick }) => {
  if (!address) return null;

  return (
    <div
      className={`address-card ${isDefault ? "default" : ""} ${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className="address-header">
        <FiHome className="address-icon" />
        <strong>{address.fullName}</strong>

      </div>
      <p>{address.addressLine}</p>
      <p>
        {address.city}, {address.state} {address.pincode}
      </p>
      <p className="address-phone">
        <FiPhone className="icon" /> {address.phoneNumber}
      </p>
    </div>
  );
};

export default AddressCard;
