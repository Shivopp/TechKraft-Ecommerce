import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('eshop_token') || null);
  const [loading, setLoading] = useState(true);

  // Sync token properties into Axios default configurations
  useEffect(() => {
    if (token) {
      localStorage.setItem('eshop_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('eshop_token');
      delete axios.defaults.headers.common['Authorization'];
    }
    setLoading(false);
  }, [token]);

  // Read existing active session context on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('eshop_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 1. REGISTER ACTION (FIXED PAYLOAD PASSING)
  const register = async (name, email, password) => {
    try {
      // Sending explicit properties matches req.body destructuring exactly
      const response = await axios.post('http://localhost:5000/api/auth/register', { 
        name, 
        email, 
        password 
      });
      
      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('eshop_user', JSON.stringify(response.data.user));
        alert(`Welcome aboard, ${response.data.user.name}! 🎉`);
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration endpoint connection failure";
      alert(msg);
      return { success: false, error: msg };
    }
  };

  // 2. LOGIN ACTION
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });
      
      if (response.data.token) {
        setToken(response.data.token);
        setUser(response.data.user);
        localStorage.setItem('eshop_user', JSON.stringify(response.data.user));
        return { success: true };
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid username credentials";
      alert(msg);
      return { success: false, error: msg };
    }
  };

  // 3. LOGOUT ACTION
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('eshop_user');
    localStorage.removeItem('eshop_token');
    alert("Logged out successfully. See you soon! 👋");
  };

 return (
  <AuthContext.Provider value={{ user, setUser, token, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
    {!loading && children}
  </AuthContext.Provider>
);
}

export const useAuth = () => useContext(AuthContext);