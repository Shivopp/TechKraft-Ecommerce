import { useState, useEffect } from 'react';
import { useAdmin } from '../../context/AdminContext';

export default function Products() {
  const { products, addProduct, deleteProduct, updateProduct } = useAdmin();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Track which product is currently being edited (null means we are adding a new product)
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({ name: '', price: '', stock: '', category: '', image: '' });

  // Watch for changes when editingProduct is set to auto-populate the form inputs
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price,
        stock: editingProduct.stock,
        category: editingProduct.category || '',
        image: editingProduct.image || ''
      });
    } else {
      setFormData({ name: '', price: '', stock: '', category: '', image: '' });
    }
  }, [editingProduct]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '', stock: '', category: '', image: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return alert("Required fields missing");

    const imgUrl = formData.image.trim() || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150";

    if (editingProduct) {
      // Trigger update on the existing item id
      updateProduct(editingProduct.id, { ...formData, image: imgUrl });
    } else {
      // Create a brand new item entry
      addProduct({ ...formData, image: imgUrl });
    }
    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      {/* Action Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inventory Catalog</h1>
          <p className="text-sm text-gray-500 mt-0.5">Audit, manage tracking states, and register stock units.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-sm gap-2"
        >
          <span>➕</span> Add New Product
        </button>
      </div>

      {/* INVENTORY DATA TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                <th className="px-6 py-4">Product Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock Availability</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-11 h-11 rounded-xl object-cover bg-gray-100 border border-gray-100 flex-shrink-0"
                    />
                    <span className="font-semibold text-gray-950 block max-w-xs truncate">{product.name}</span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-600 border border-gray-200/50">
                      {product.category || 'General'}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 font-bold text-gray-900">
                    ₹{Number(product.price).toLocaleString('en-IN')}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      <span className="text-gray-600 font-medium">{product.stock} units</span>
                    </div>
                  </td>

                  {/* Actions Column (Edit + Delete Buttons) */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(product)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 transition text-base"
                        title="Edit product"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition text-base"
                        title="Remove product"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DYNAMIC MODAL OVERLAY (HANDLES BOTH ADD AND EDIT) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={handleCloseModal} />
          
          <div className="relative w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            {/* Dynamic Modal Heading Text */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingProduct ? 'Modify Product Details' : 'Register New Item'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Product Title *</label>
                <input
                  type="text" required placeholder="e.g. Wireless Charger Pad"
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Price (₹) *</label>
                  <input
                    type="number" required min="0" placeholder="999"
                    value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Stock Count *</label>
                  <input
                    type="number" required min="0" placeholder="25"
                    value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})}
                    className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                <input
                  type="text" placeholder="e.g. Electronics, Wearables"
                  value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Product Image Link</label>
                <input
                  type="url" placeholder="https://images.unsplash.com/... (optional)"
                  value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button" onClick={handleCloseModal}
                  className="flex-1 text-sm font-semibold text-gray-500 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-2.5 rounded-xl transition"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="flex-1 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 py-2.5 rounded-xl transition shadow-sm"
                >
                  {editingProduct ? 'Save Updates' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}