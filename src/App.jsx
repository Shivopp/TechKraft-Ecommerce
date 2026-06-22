import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Products from './components/admin/Products';
import Orders from './components/admin/Orders'; // <-- Import real component file
import { AdminProvider } from './context/AdminContext';

export default function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <Routes>
          {/* Customer Front Storefront */}
          <Route path="/" element={<Home />} />

          {/* Secure Dashboard Core Framework Layout Shell */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} /> {/* <-- Connected dynamically */}
          </Route>
        </Routes>
      </AdminProvider>
    </BrowserRouter>
  );
}