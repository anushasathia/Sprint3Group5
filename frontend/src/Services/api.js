const API_BASE_URL = 'http://your-api-base-url'; // Replace with your actual API URL

export const getCartItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      credentials: 'include', // For cookies if using session-based auth
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch cart items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const addToCart = async (product) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productId: product.id,
        size: product.selectedSize || 'M',
        quantity: product.quantity || 1,
      }),
    });
    if (!response.ok) throw new Error('Failed to add item to cart');
    return await response.json();
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update cart item');
    return await response.json();
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) throw new Error('Failed to remove item from cart');
    return await response.json();
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};