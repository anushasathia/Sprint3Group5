import React from 'react';
import '../styles/Welcomepage.css';

const Welcome = ({ onStartShopping }) => {
  return (
    <div className="landing-page">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="main-title">Welcome to Our Store</h1>
        <p className="subtitle">Discover premium clothing that matches your unique style</p>
        <button className="start-button" onClick={onStartShopping}>
          Explore Collection
          <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;