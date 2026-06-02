
const Footer = () => {
  return (
    <footer className="w-full bg-[#1c1c1e] text-gray-400 px-6 py-12 md:px-16 md:py-20 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
        
        {/* Brand Section */}
        <div className="md:col-span-5 space-y-4">
          <h2 className="text-2xl font-serif italic text-white tracking-tight">TechKart</h2>
          <p className="text-xs leading-relaxed max-w-xs text-gray-400">
            Your destination for curated fashion and a seamless shopping experience.
          </p>
        </div>

        {/* Divider line matching the layout design */}
        <div className="hidden md:block md:col-span-1 border-l border-gray-800 h-full justify-self-center"></div>

        {/* Quick Links */}
        <div className="md:col-span-3 space-y-4 text-xs">
          <h4 className="text-white uppercase font-semibold tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5">
            <li><a href="#shop" className="hover:text-white transition-colors">Shop All</a></li>
            <li><a href="#arrivals" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#gifts" className="hover:text-white transition-colors">Gift Cards</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className="md:col-span-3 space-y-4 text-xs">
          <h4 className="text-white uppercase font-semibold tracking-wider">Customer Service</h4>
          <ul className="space-y-2.5">
            <li><a href="#contact" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#refund" className="hover:text-white transition-colors">Refund Policy</a></li>
            <li><a href="#shipping" className="hover:text-white transition-colors">Shipping</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright info */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800/50 text-[10px] tracking-wider text-gray-500 uppercase">
        © TechKart 2026
      </div>
    </footer>
  );
};

export default Footer;