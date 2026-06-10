import { useAdmin } from '../../context/AdminContext';

export default function Dashboard() {
  const { stats, recentOrders, weeklyRevenue } = useAdmin();

  return (
    <div className="space-y-8">
      {/* Upper Title Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Here is a summary of your e-commerce store's performance today.</p>
      </div>

      {/* 1. KEY METRICS GRID */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="text-sm font-medium text-gray-500">Total Revenue</div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stats.salesGrowth}</span>
          </div>
        </div>

        {/* Total Orders Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="text-sm font-medium text-gray-500">Lifetime Orders</div>
          <div className="text-2xl font-bold text-gray-900 mt-2">{stats.totalOrders}</div>
        </div>

        {/* Average Order Value Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="text-sm font-medium text-gray-500">Avg. Order Value</div>
          <div className="text-2xl font-bold text-gray-900 mt-2">₹456</div>
        </div>

        {/* Out of Stock Warning Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="text-sm font-medium text-gray-500">Low Stock Items</div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-2xl font-bold text-gray-900">{stats.lowStockAlerts}</span>
            {stats.lowStockAlerts > 0 && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Action Needed</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. ANALYTICS CHART & RECENT LOGS SECTION */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Weekly Performance Bar Component */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-1">
          <h3 className="text-base font-semibold text-gray-900 mb-6">Weekly Revenue Activity</h3>
          <div className="flex h-48 items-end justify-between gap-2 pt-4 px-2">
            {weeklyRevenue.map((data) => (
              <div key={data.day} className="flex flex-col items-center flex-1 h-full justify-end group relative">
                {/* Tooltip on hover */}
                <span className="absolute -top-6 bg-slate-900 text-white text-xs px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mb-1 shadow-sm">
                  {data.value}%
                </span>
                {/* Visual Bar fill */}
                <div 
                  style={{ height: `${data.value}%` }} 
                  className="w-full bg-purple-600 rounded-t-md hover:bg-purple-700 transition-all duration-300"
                />
                <span className="text-xs font-medium text-gray-400 mt-2">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Order Monitor Table Component */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:col-span-2 overflow-x-auto">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Incoming Order Monitor</h3>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs font-semibold uppercase text-gray-400 tracking-wider">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Items</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 font-medium text-purple-600">{order.id}</td>
                  <td className="py-3.5 font-medium text-gray-900">{order.customer}</td>
                  <td className="py-3.5 text-gray-500">{order.items} items</td>
                  <td className="py-3.5 font-semibold text-gray-900">₹{order.total}</td>
                  <td className="py-3.5 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      order.status === 'Delivered' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                      order.status === 'Pending' ? 'bg-amber-50 border-amber-100 text-amber-700' :
                      'bg-blue-50 border-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
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