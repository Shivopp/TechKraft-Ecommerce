import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('eshop_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('eshop_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert("Cannot add more units than available stock");
          return prevItems;
        }
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item._id === id) {
          const newQty = item.quantity + amount;
          if (newQty <= 0) return item;
          if (newQty > item.stock) {
            alert("Cannot exceed available stock");
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const checkout = async (customerDetails) => {
  try {
    await axios.post("https://ecart-backend-yocf.onrender.com/api/orders", {
      customerName: customerDetails.name,
      email: customerDetails.email,
      address: customerDetails.address,
      items: cartItems.map(item => ({
        
        productId: item._id || item.id, 
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: getCartTotal()
    });

    alert("Order placed successfully! 🎉");
    clearCart();
    return true;
  } catch (error) {
    console.error("Checkout failed:", error.message);
    alert("Checkout failed. Please try again.");
    return false;
  }
};

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, checkout }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);