import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import ProductsPage from './components/ProductsPage';
import Cart from './components/Cart';
import Login from './components/Login'; 
import AdminLogin from './components/AdminLogin'; // Cleaned up import reference
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Orders from './components/admin/Orders'; 
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider> 
        <AdminProvider>
          <CartProvider>
            <Routes>
              {/* ================= PUBLIC INDEPENDENT ROUTES ================= */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} /> 
              
              {/* Secret independent route for your specific Admin credentials */}
              <Route path="/admin-login" element={<AdminLogin />} /> 

              {/* ================= PROTECTED NESTED ADMIN ROUTES ================= */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />          
                <Route path="products" element={<Products />} />  
                <Route path="orders" element={<Orders />} />    
              </Route>
              
            </Routes>
          </CartProvider>
        </AdminProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}