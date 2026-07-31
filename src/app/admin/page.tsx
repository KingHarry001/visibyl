import Link from "next/link";
import { getDashboardStats } from "./actions";

export default async function AdminDashboard() {
  // 100% Server-Side fetching! No loading states needed.
  const stats = await getDashboardStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time data from your database.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <StatCard label="Total Products" value={stats.productCount} />
        <StatCard label="Total Users" value={stats.userCount} />
        <StatCard label="Total Orders" value={stats.orderCount} />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Recent Orders</h2>
          <Link href="/admin/orders" className="text-sm font-medium text-[var(--v-blue)] hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50/50 text-xs uppercase text-slate-500 font-mono">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Total</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No orders found yet.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 font-mono text-xs">
                      {order.id.split('-')[0]}...
                    </td>
                    <td className="px-6 py-4">{order.user?.email || "Guest"}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">
                      ₦{order.totalAmount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--v-blue)]/5 to-transparent rounded-bl-full pointer-events-none" />
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2 font-display tracking-tight">{value}</p>
    </div>
  );
}