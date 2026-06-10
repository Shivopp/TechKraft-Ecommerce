import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  // Stats summary engine
  const [stats, setStats] = useState({
    totalRevenue: 142350,
    salesGrowth: "+12%",
    totalOrders: 312,
    lowStockAlerts: 2,
  });
  

  const [weeklyRevenue, setWeeklyRevenue] = useState([
    { day: "Mon", value: 65 }, { day: "Tue", value: 45 }, { day: "Wed", value: 85 },
    { day: "Thu", value: 30 }, { day: "Fri", value: 90 }, { day: "Sat", value: 75 }, { day: "Sun", value: 50 },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: "Alpha Wireless Headphones", price: 2999, stock: 45, category: "Electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150" },
    { id: 2, name: "Minimalist Smart Watch", price: 4999, stock: 4, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150" },
  ]);

  // Dynamic order database log with added details for our tracking panel
  const [recentOrders, setRecentOrders] = useState([
    { id: "ORD-9482", customer: "Rahul Sharma", email: "rahul@example.com", items: "2x Alpha Wireless Headphones", total: 5998, status: "Delivered", date: "June 09, 2026" },
    { id: "ORD-9481", customer: "Priya Patel", email: "priya@example.com", items: "1x Minimalist Smart Watch", total: 4999, status: "Pending", date: "June 10, 2026" },
    { id: "ORD-9480", customer: "Amit Singh", email: "amit@example.com", items: "1x Alpha Wireless Headphones", total: 2999, status: "Processing", date: "June 08, 2026" },
  ]);

  const addProduct = (newProd) => {
    setProducts((prev) => [...prev, { ...newProd, id: Date.now(), stock: Number(newProd.stock), price: Number(newProd.price) }]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter(p => p.id !== id));
  };

  // 🔥 PLACED HERE: Your new editing operation logic handler 
  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id 
          ? { 
              ...product, 
              ...updatedFields, 
              price: Number(updatedFields.price), 
              stock: Number(updatedFields.stock) 
            } 
          : product
      )
    );
  };

  // Action handler to switch status indicators
  const updateOrderStatus = (orderId, newStatus) => {
    setRecentOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    /* 🔥 UPDATED HERE: Added updateProduct reference to the provider context string list below */
    <AdminContext.Provider value={{ stats, recentOrders, weeklyRevenue, products, addProduct, deleteProduct, updateProduct, updateOrderStatus }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);