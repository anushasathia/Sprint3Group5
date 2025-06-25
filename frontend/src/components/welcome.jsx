import React from 'react';
import '../landingpage.css';

const Welcome = ({ onStartShopping }) => {
  return (
    <div className="landing-page">
      <nav className="nav">
        <a href="#" className="nav-link">About</a>
      </nav>

      <div className="content">
        <h1 className="main-title">Welcome to Our Store</h1>
        <p className="subtitle">Discover amazing products at great prices</p>
        <button className="start-button" onClick={onStartShopping}>
          Start Shopping
        </button>
      </div>
    </div>
  );
};

export default Welcome;