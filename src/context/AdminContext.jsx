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

  const API_URL = "https://ecart-backend-yocf.onrender.com/api/products";
  const ORDERS_API_URL = "https://ecart-backend-yocf.onrender.com/api/orders";

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
      console.error("Error fetching orders:", error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

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
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${ORDERS_API_URL}/${orderId}`, { status: newStatus });
      setRecentOrders((prev) =>
        prev.map((order) => (order._id === orderId ? response.data : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  return (
    <AdminContext.Provider value={{ stats, recentOrders, weeklyRevenue, products, addProduct, updateProduct, deleteProduct, updateOrderStatus, fetchOrders }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);