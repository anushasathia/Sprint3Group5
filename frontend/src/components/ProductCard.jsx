import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart, selectedSize, setSelectedSize }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-5px)' : 'none',
        background: '#fff'
      }}
    >
      {/* Sale Badge */}
      {product.price < 50 && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: '#ff3e6c',
          color: 'white',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '600',
          zIndex: '2'
        }}>
          SALE
        </div>
      )}

      {/* Product Image with Hover Effect */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        height: '280px',
        background: '#f5f5f6'
      }}>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />


               )}
      </div>

      <div style={{
        padding: '16px',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '8px'
        }}>
          <h3 style={{
            margin: '0',
            fontSize: '16px',
            fontWeight: '600',
            color: '#3e4152',
            lineHeight: '1.4',
            maxWidth: '70%'
          }}>
            {product.name}
          </h3>
          <div style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#3e4152'
          }}>
            ${product.price.toFixed(2)}
          </div>
        </div>

        <div style={{
          fontSize: '14px',
          color: '#535766',
          marginBottom: '12px'
        }}>
          {product.brand}
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px'
        }}>
          <div style={{
            color: '#ffd700',
            letterSpacing: '2px',
            fontSize: '14px'
          }}>
            ★★★★☆
          </div>
          <span style={{
            fontSize: '12px',
            color: '#93959f',
            marginLeft: '5px'
          }}>
            (24)
          </span>
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginTop: '10px'
        }}>
          <select
            value={selectedSize[product.id] || 'M'}
            onChange={(e) => setSelectedSize(product.id, e.target.value)}
            style={{
              flex: '1',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #d4d5d9',
              fontSize: '14px',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {['XS', 'S', 'M', 'L', 'XL'].map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>

          <button
            onClick={() => onAddToCart(product)}
            style={{
              flex: '2',
              padding: '10px',
              background: '#ff3e6c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              ':hover': {
                background: '#ff527b',
                boxShadow: '0 2px 8px rgba(255, 62, 108, 0.3)'
              }
            }}
          >
            ADD TO CART
          </button>
          </div>
      </div>
    </div>
  );
};

export default ProductCard;