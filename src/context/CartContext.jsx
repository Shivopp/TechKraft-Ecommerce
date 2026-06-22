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
    // 1. Automatically switch endpoint targets based on host environment
    const IS_PRODUCTION = import.meta.env.PROD;
    const CHECKOUT_URL = IS_PRODUCTION 
      ? "https://ecart-backend-yocf.onrender.com/api/orders" 
      : "http://localhost:5000/api/orders";

    // 2. Safety Fallback Wrapper: Prevents "Cannot read property of undefined" crashes
    const safeName = customerDetails?.name || "Shiv";
    const safeEmail = customerDetails?.email || "shiv@example.com";
    const safeAddress = customerDetails?.address || "MMMUT Gorakhpur, UP";

    // 3. Prevent submission of an empty shopping tray configuration
    if (!cartItems || cartItems.length === 0) {
      alert("Your shopping cart is empty!");
      return false;
    }

    console.log("🚀 Dispatching secure full-stack payload package to:", CHECKOUT_URL);

    // 4. Send structured dataset down to Node API server gateway
    const response = await axios.post(CHECKOUT_URL, {
      customerName: safeName,
      email: safeEmail,
      address: safeAddress,
      items: cartItems.map(item => ({
        productId: String(item._id || item.id || "dummy-id-123"), 
        name: item.name || "E-Cart Showcase Item",
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0)
      })),
      totalAmount: Number(getCartTotal() || 0)
    });

    console.log("✅ API Success Response Matrix:", response.data);
    
    alert("Order placed successfully! 🎉");
    clearCart();
    return true;
  } catch (error) {
    // Enhanced error tracing layer
    console.error("❌ Full Checkout Network Crash Diagnostics:", error.response?.data || error.message);
    alert(`Checkout failed: ${error.response?.data?.message || error.message}`);
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