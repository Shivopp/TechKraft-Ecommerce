import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartItems } = useCart(); // Assuming your cart uses cartItems array state
  const navigate = useNavigate();

  // Safely calculate total item quantity in the cart badge indicator
  const cartBadgeCount = (cartItems || []).reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo Link */}
        <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight hover:opacity-90 transition">
          🛒 <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">E-Shop</span>
        </Link>

        {/* Global Navigation Frame */}
        <nav className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">
            Home
          </Link>
          
          {/* Shopping Cart Trigger icon with dynamic badge counting */}
          <Link to="/cart" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition relative flex items-center">
            Cart
            {cartBadgeCount > 0 && (
              <span className="absolute -top-2 -right-3.5 bg-purple-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {cartBadgeCount}
              </span>
            )}
          </Link>

          {/* DYNAMIC USER SESSIONS ACTION - FIXED CONTROLS HERE */}
          {user ? (
            <div className="flex items-center gap-3">
              {/* Displays user's name ('Shiv') when logged in */}
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100/50">
                👤 {user.name}
              </span>
              
              {/* Role-based link: Only show Admin Panel button to Admin users */}
              {user.role === 'admin' && (
                <Link to="/admin" className="text-xs font-semibold text-gray-600 hover:text-purple-600 border border-gray-200 px-3 py-1.5 rounded-xl transition">
                  Admin
                </Link>
              )}

              <button
                onClick={logout}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 border border-rose-100 hover:border-rose-200 px-3 py-1.5 rounded-xl transition bg-rose-50/20"
              >
                Log Out
              </button>
            </div>
          ) : (
            // Displays if guest user state is null
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl transition shadow-sm shadow-purple-600/10"
            >
              Sign In
            </button>
          )}
        </nav>

      </div>
    </header>
  );
}