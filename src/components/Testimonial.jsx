const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:px-12 text-center">
      <h2 className="text-3xl font-serif text-gray-900 mb-12">What our customers are saying</h2>
      
      <div className="flex items-center justify-between gap-4">
        {/* Left Arrow */}
        <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
          ←
        </button>

        {/* Testimonial Card */}
        <div className="bg-[#f4f4f6] rounded-3xl p-8 md:p-12 max-w-3xl w-full flex flex-col md:flex-row gap-8 items-center text-left relative">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shrink-0 bg-gray-200">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80" 
              alt="Customer" 
              className="w-full h-full object-cover grayscale-[20%]"
            />
          </div>
          
          <div className="flex flex-col justify-between h-48 w-full py-2">
            <div className="space-y-4">
              <div className="text-2xl text-gray-800">
                <span className="inline-block transform rotate-45 text-xl font-light">↑</span>
              </div>
              <p className="text-lg font-medium text-gray-900">Customer Review</p>
            </div>
            
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-gray-500">Customer Name</p>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors shrink-0">
          →
        </button>
      </div>
    </section>
  );
};

export default Testimonial;