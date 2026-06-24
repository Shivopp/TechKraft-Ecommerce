import { useAdmin } from '../context/AdminContext';
import { useCart } from '../context/CartContext';
import { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './Navbar';
import Testimonial from './Testimonial';
import Footer from './Footer';

// ─── Infinite Hero Slideshow ───────────────────────────────────────────────
function HeroSlideshow({ products, addToCart }) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const next = useCallback(() => {
    goTo((current + 1) % products.length);
  }, [current, products.length, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + products.length) % products.length);
  }, [current, products.length, goTo]);

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    if (products.length <= 1) return;
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, [next, products.length]);

  // Pause on hover
  const pauseTimer = () => clearInterval(timerRef.current);
  const resumeTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3500);
  };

  if (!products.length) return null;

  const product = products[current];

  return (
    <div
      className="relative w-full overflow-hidden bg-[#f4f4f6] rounded-2xl mx-auto max-w-7xl"
      style={{ minHeight: '420px' }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      {/* Slides */}
      {products.map((p, i) => (
        <div
          key={p._id}
          className="absolute inset-0 grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-8 md:px-14 py-12 md:py-16"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? 'translateX(0)' : i < current ? 'translateX(-40px)' : 'translateX(40px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
            pointerEvents: i === current ? 'auto' : 'none',
          }}
        >
          {/* Left: Text */}
          <div className="md:col-span-6 space-y-4 z-10">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              {p.category || 'Featured'}
            </span>
            <h1 className="text-3xl md:text-5xl font-serif tracking-tight text-gray-900 leading-tight">
              {p.name}
            </h1>
            <p className="text-2xl font-extrabold text-gray-900">
              ₹{Number(p.price).toLocaleString('en-IN')}
            </p>
            <p className={`text-sm font-medium ${p.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
              {p.stock > 0 ? `✓ In Stock — ${p.stock} units left` : '✗ Out of Stock'}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => addToCart(p)}
                disabled={p.stock === 0}
                className={`px-7 py-3 rounded-full text-sm font-semibold transition-all ${
                  p.stock > 0
                    ? 'bg-black text-white hover:bg-gray-800 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {p.stock > 0 ? '🛒 Add to Cart' : '🚫 Unavailable'}
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="md:col-span-6 flex items-center justify-center h-full">
            <img
              src={p.image}
              alt={p.name}
              className="max-h-72 md:max-h-80 w-auto object-contain drop-shadow-xl"
              style={{ transition: 'opacity 0.5s ease' }}
            />
          </div>
        </div>
      ))}

      {/* Left arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition text-gray-700 hover:text-gray-900"
        aria-label="Previous product"
      >
        ‹
      </button>

      {/* Right arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition text-gray-700 hover:text-gray-900"
        aria-label="Next product"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all rounded-full ${
              i === current
                ? 'w-6 h-2 bg-gray-900'
                : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-5 right-5 z-20 text-xs font-semibold text-gray-500 bg-white/70 px-2.5 py-1 rounded-full">
        {current + 1} / {products.length}
      </div>
    </div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────
export default function Home() {
  const { products } = useAdmin();
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased">
      <Navbar />

      {/* Hero Slideshow */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        {products.length === 0 ? (
          // Fallback static hero if no products yet
          <section className="bg-[#f4f4f6] rounded-2xl px-8 py-16 md:px-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-[360px]">
            <div className="md:col-span-5 space-y-5">
              <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-gray-900 leading-tight">
                High-quality tech <br />
                <span className="italic">gadgets</span> & accessories
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <button className="bg-black text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                  Browse
                </button>
                <button className="border border-gray-400 text-black text-sm font-medium px-8 py-3 rounded-full hover:bg-gray-50 transition-colors">
                  About Us
                </button>
              </div>
            </div>
            <div className="md:col-span-7 flex items-center justify-center min-h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80"
                alt="Tech showcase"
                className="w-full max-w-md rounded-xl object-contain"
              />
            </div>
          </section>
        ) : (
          <HeroSlideshow products={products} addToCart={addToCart} />
        )}
      </div>

      {/* Product Grid */}
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