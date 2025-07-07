import React from "react";

const AddressForm = ({ 
  address, 
  onInputChange, 
  onSave, 
  onCancel, 
  saveAddress, 
  setSaveAddress,
  isValid 
}) => {
  return (
    <div className="address-form">
      <h4>Enter New Address</h4>
      {["fullName", "addressLine", "city", "state", "pincode", "phoneNumber", "email"].map((field) => (
        <div className="form-group" key={field}>
          <label>{field.replace(/([A-Z])/g, ' $1')}</label>
          <input
            type={field === "email" ? "email" : "text"}
            name={field}
            value={address[field]}
            onChange={onInputChange}
            required
          />
        </div>
      ))}
      <div className="save-address">
        <input 
          type="checkbox" 
          id="saveAddress" 
          checked={saveAddress} 
          onChange={() => setSaveAddress(!saveAddress)} 
        />
        <label htmlFor="saveAddress">Save this address for future</label>
      </div>
      <div className="form-actions">
        <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        <button className="use-address-btn" onClick={onSave} disabled={!isValid}>
          Use This Address
        </button>
      </div>
    </div>
  );
};

export default AddressForm;