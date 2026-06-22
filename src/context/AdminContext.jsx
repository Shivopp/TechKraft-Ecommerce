import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [stats, setStats] = useState({
    totalRevenue: 142350,
    salesGrowth: "+12%",
    totalOrders: 312,
    lowStockAlerts: 0,
  });

  const [products, setProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  
  const [weeklyRevenue, setWeeklyRevenue] = useState([
    { day: "Mon", value: 65 }, { day: "Tue", value: 45 }, { day: "Wed", value: 85 },
    { day: "Thu", value: 30 }, { day: "Fri", value: 90 }, { day: "Sat", value: 75 }, { day: "Sun", value: 50 },
  ]);

  // ==========================================
  // CONFIGURATION: ENVIRONMENT-AWARE API URLS
  // ==========================================
  const IS_PRODUCTION = import.meta.env.PROD;

  const API_URL = IS_PRODUCTION 
    ? "https://ecart-backend-yocf.onrender.com/api/products" 
    : "http://localhost:5000/api/products";

  const ORDERS_API_URL = IS_PRODUCTION 
    ? "https://ecart-backend-yocf.onrender.com/api/orders" 
    : "http://localhost:5000/api/orders";

  // ==========================================
  // 1. READ OPERATIONS (Fetch Products & Orders)
  // ==========================================
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products from database:", error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(ORDERS_API_URL);
      setRecentOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders from database:", error.message);
    }
  };

  // Run automatically when the context mounts
  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  // ==========================================
  // 2. PRODUCT CRUD OPERATIONS
  // ==========================================
  const addProduct = async (newProd) => {
    try {
      const response = await axios.post(API_URL, {
        name: newProd.name,
        price: Number(newProd.price),
        stock: Number(newProd.stock),
        category: newProd.category,
        image: newProd.image
      });
      setProducts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding product to database:", error.message);
      alert("Failed to save product to database.");
    }
  };

  const updateProduct = async (id, updatedFields) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        name: updatedFields.name,
        price: Number(updatedFields.price),
        stock: Number(updatedFields.stock),
        category: updatedFields.category,
        image: updatedFields.image
      });
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? response.data : product))
      );
    } catch (error) {
      console.error("Error updating product in database:", error.message);
      alert("Failed to save product updates.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("Failed to delete product.");
    }
  };

  // ==========================================
  // 3. ORDER MANAGEMENT OPERATIONS
  // ==========================================
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${ORDERS_API_URL}/${orderId}`, { status: newStatus });
      setRecentOrders((prev) =>
        prev.map((order) => (order._id === orderId ? response.data : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error.message);
      alert("Failed to update order status.");
    }
  };
  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to permanently delete this order?")) return;
    
    try {
      await axios.delete(`${ORDERS_API_URL}/${orderId}`);
      // Remove the deleted order from the UI state automatically
      setRecentOrders((prev) => prev.filter(order => order._id !== orderId));
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error.message);
      alert("Failed to delete the order.");
    }
  };

  return (
    <AdminContext.Provider 
      value={{ 
        stats, 
        recentOrders, 
        weeklyRevenue, 
        products, 
        addProduct, 
        updateProduct, 
        deleteProduct, 
        updateOrderStatus,
        deleteOrder, 
        fetchOrders,
        fetchProducts 
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);