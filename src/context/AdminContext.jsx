import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // <-- Import our delivery courier tool

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [stats, setStats] = useState({
    totalRevenue: 142350,
    salesGrowth: "+12%",
    totalOrders: 312,
    lowStockAlerts: 0, // We will update this dynamically based on real data
  });

  const [products, setProducts] = useState([]); // Start with an empty warehouse list!
  const [recentOrders, setRecentOrders] = useState([
    { id: "ORD-9482", customer: "Rahul Sharma", email: "rahul@example.com", items: "2x Alpha Wireless Headphones", total: 5998, status: "Delivered", date: "June 09, 2026" },
    { id: "ORD-9481", customer: "Priya Patel", email: "priya@example.com", items: "1x Minimalist Smart Watch", total: 4999, status: "Pending", date: "June 10, 2026" },
  ]);
  const [weeklyRevenue, setWeeklyRevenue] = useState([
    { day: "Mon", value: 65 }, { day: "Tue", value: 45 }, { day: "Wed", value: 85 },
    { day: "Thu", value: 30 }, { day: "Fri", value: 90 }, { day: "Sat", value: 75 }, { day: "Sun", value: 50 },
  ]);

  // URL of your Express Backend Server
  const API_URL = "https://ecart-backend-yocf.onrender.com/api/products";

  // 1. FETCH OPERATION (Load products from database on startup)
  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data); // Puts the database items into our React state
    } catch (error) {
      console.error("Error fetching products from database:", error.message);
    }
  };

  // Run fetchProducts automatically the moment the admin dashboard opens
  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. CREATE OPERATION (Send new product data to backend)
  const addProduct = async (newProd) => {
    try {
      // Axios sends the data over to port 5000/api/products
      const response = await axios.post(API_URL, {
        name: newProd.name,
        price: Number(newProd.price),
        stock: Number(newProd.stock),
        category: newProd.category,
        image: newProd.image
      });

      // Update frontend screen immediately with the newly saved item from MongoDB
      setProducts((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding product to database:", error.message);
      alert("Failed to save product to database.");
    }
  };
  // 4. UPDATE OPERATION (Send updated product fields to backend)
const updateProduct = async (id, updatedFields) => {
  try {
    // Axios sends a PUT request to http://localhost:5000/api/products/:id
    const response = await axios.put(`${API_URL}/${id}`, {
      name: updatedFields.name,
      price: Number(updatedFields.price),
      stock: Number(updatedFields.stock),
      category: updatedFields.category,
      image: updatedFields.image
    });

    // Update the frontend screen immediately with the new data from MongoDB
    setProducts((prev) =>
      prev.map((product) => (product._id === id ? response.data : product))
    );
  } catch (error) {
    console.error("Error updating product in database:", error.message);
    alert("Failed to save product updates.");
  }
};

  // 3. DELETE OPERATION (Remove product from database)
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter(p => p._id !== id)); // Note: MongoDB uses _id instead of id!
    } catch (error) {
      console.error("Error deleting product:", error.message);
    }
  };

  return (
    <AdminContext.Provider value={{ stats, recentOrders, weeklyRevenue, products, addProduct, deleteProduct }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);