import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Cart from './components/Cart';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Orders from './components/admin/Orders'; 
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />          
              <Route path="products" element={<Products />} />  
              <Route path="orders" element={<Orders />} />    
            </Route>
          </Routes>
        </CartProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}