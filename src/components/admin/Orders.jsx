import { useAdmin } from '../../context/AdminContext';

export default function Orders() {
  // Destructured deleteOrder from context
  const { recentOrders, updateOrderStatus, deleteOrder } = useAdmin();

  const statusOptions = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-6">
      {/* Upper Information Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Order Fulfillment Control</h1>
        <p className="text-sm text-gray-500 mt-0.5">Track user checkouts, manage shipment pipelines, and update transaction records.</p>
      </div>

      {/* ORDERS LOG DATA TABLE */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                <th className="px-6 py-4">Order Metadata</th>
                <th className="px-6 py-4">Customer Details</th>
                <th className="px-6 py-4">Itemized Products</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Fulfillment Status</th>
                <th className="px-6 py-4 text-center">Fulfillment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {(recentOrders || []).map((order) => (
                <tr key={order._id || order.id} className="hover:bg-gray-50/30 transition-colors">
                  {/* ID & Date Frame */}
                  <td className="px-6 py-4">
                    <span className="font-bold text-purple-600 block text-xs truncate max-w-[120px]">
                      {order._id || order.id}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {order.date ? new Date(order.date).toLocaleDateString() : 'Recent'}
                    </span>
                  </td>

                  {/* Customer Info profile */}
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-950 block">{order.customerName || 'N/A'}</span>
                    <span className="text-xs text-gray-400 block mt-0.5">{order.email}</span>
                  </td>

                  {/* Purchased Items description */}
                  <td className="px-6 py-4 text-gray-600 max-w-xs">
                    <div className="space-y-1">
                      {(order.items || []).map((item, idx) => (
                        <div key={item._id || idx} className="text-xs font-medium text-gray-600">
                          📦 {item.name || "Product"} <span className="text-purple-600 font-bold">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Price breakdown */}
                  <td className="px-6 py-4 font-bold text-gray-950">
                    ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
                  </td>

                  {/* Dynamic Status Badges */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                      order.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                      order.status === 'Cancelled' ? 'bg-rose-50 border-rose-100 text-rose-700' :
                      'bg-blue-50 border-blue-100 text-blue-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                        order.status === 'Delivered' ? 'bg-emerald-500' :
                        order.status === 'Pending' ? 'bg-amber-500' :
                        order.status === 'Cancelled' ? 'bg-rose-500' : 'bg-blue-500'
                      }`} />
                      {order.status || 'Pending'}
                    </span>
                  </td>

                  {/* Quick Dropdown Pipeline Status Switcher & Delete Layout Action */}
                  <td className="px-6 py-4 text-center space-y-2">
                    <select
                      value={order.status || 'Pending'}
                      onChange={(e) => updateOrderStatus(order._id || order.id, e.target.value)}
                      className="text-xs font-medium bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 px-2.5 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/10 focus:border-purple-500 transition cursor-pointer block mx-auto"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>

                    {/* Integrated Order Purge Action */}
                    <button
                      onClick={() => deleteOrder(order._id || order.id)}
                      className="text-xs text-rose-600 hover:text-rose-800 font-semibold transition hover:underline block mx-auto pt-1"
                    >
                      🗑️ Delete Order
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}