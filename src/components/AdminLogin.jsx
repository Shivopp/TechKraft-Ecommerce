import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useAuth(); // Grab setUser to artificially create an admin session
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // 🚨 SET YOUR SECRET MASTER CREDENTIALS HERE
    const SECRET_ADMIN_ID = "admin123";
    const SECRET_PASSWORD = "supersecretpassword";

    if (adminId === SECRET_ADMIN_ID && password === SECRET_PASSWORD) {
      const adminSession = { name: "Master Admin", email: "admin@store.com", role: "admin" };
      
      // Save session to AuthContext state and localStorage
      setUser(adminSession);
      localStorage.setItem('eshop_user', JSON.stringify(adminSession));
      localStorage.setItem('eshop_token', 'secret-admin-master-token'); // Fake token to bypass layout checks
      
      alert("Access Granted: Welcome back, Commander! 🛡️");
      navigate('/admin');
    } else {
      alert("❌ Invalid Admin Key ID or Password!");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-2xl border border-rose-100 shadow-xl shadow-rose-500/5">
        <div className="text-center">
          <span className="text-4xl">🔐</span>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 tracking-tight">Admin Gate Control</h2>
          <p className="text-xs text-gray-400 mt-1">Authorized personnel only. Logs are being monitored.</p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleAdminLogin}>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Admin ID Key</label>
            <input
              type="text" required
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono"
              placeholder="e.g. admin123"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Master Password</label>
            <input
              type="password" required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition shadow-md shadow-rose-600/20"
          >
            Authenticate Security Key
          </button>
        </form>
      </div>
    </div>
  );
}