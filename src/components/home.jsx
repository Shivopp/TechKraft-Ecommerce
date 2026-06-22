import { useAdmin } from '../context/AdminContext';
import Navbar from './Navbar';
import Hero from './Hero';
import Testimonial from './Testimonial';
import Footer from './Footer';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { products } = useAdmin();
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
          <p className="text-sm text-gray-500 mt-1">Explore our latest arrivals fetched live from our storage vault.</p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <span className="text-4xl">📦</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-4">No Products Available</h3>
            <p className="text-sm text-gray-400 mt-1">Head over to the Admin Panel to register your first stock item!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product._id} 
                className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between"
              >
                <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-50 border border-gray-100/50 mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md mb-2">
                    {product.category || 'General'}
                  </span>
                  <h3 className="font-bold text-gray-900 text-base line-clamp-1">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-extrabold text-gray-950">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </span>
                    
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                      product.stock > 0 
                        ? 'text-emerald-700 bg-emerald-50' 
                        : 'text-rose-700 bg-rose-50'
                    }`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0}
                  className={`w-full mt-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                    product.stock > 0
                      ? 'bg-purple-600 text-white hover:bg-purple-700 shadow-sm shadow-purple-600/10'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.stock > 0 ? '🛒 Add to Cart' : '🚫 Unavailable'}
                </button>

              </div>
            ))}
          </div>
        )}
      </section>

      <Testimonial />

      <Footer />
    </div>
  );
}