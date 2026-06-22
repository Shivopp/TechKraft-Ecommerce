import { Link } from 'react-router-dom'; // <-- Essential: Import Link tool

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Side: Storefront Branding Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-950 tracking-tight flex items-center gap-2">
              <span>🛍️</span> E-Shop Store
            </Link>
          </div>

          {/* Center/Right Side: Standard Navigation Links */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">
              Home
            </Link>
            <Link to="#" className="text-sm font-medium text-gray-600 hover:text-purple-600 transition">
              Categories
            </Link>

            {/* ✨ ADDED HERE: The Admin Dashboard Gateway Button */}
            <Link
              to="/admin"
              className="inline-flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition duration-200 shadow-sm gap-1.5 border border-slate-800"
            >
              <span>⚙️</span> Admin Panel
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}