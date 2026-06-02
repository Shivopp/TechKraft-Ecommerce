
const Navbar = () => {
  return (
    <nav className="w-full bg-white border-b border-gray-100 px-6 py-4 md:px-12 flex items-center justify-between">
      <div className="flex items-center space-x-8 text-xs font-medium uppercase tracking-wider text-gray-600">
        <a href="#home" className="hover:text-black transition-colors">Home</a>
        <a href="#about" className="hover:text-black transition-colors">About</a>
        <a href="#products" className="hover:text-black transition-colors">Products</a>
      </div>
      
      <div className="text-xl font-semibold tracking-tight text-gray-900">
        TechKart
      </div>
      
      <div className="flex items-center space-x-6 text-xs font-medium uppercase tracking-wider text-gray-600">
        <a href="#wishlist" className="hover:text-black transition-colors">Wishlist</a>
        <a href="#cart" className="hover:text-black transition-colors">Cart</a>
      </div>
    </nav>
  );
};

export default Navbar;