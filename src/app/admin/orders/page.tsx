"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

const statusIcons: Record<string, React.ReactNode> = {
  PENDING: <Clock className="w-4 h-4" />,
  CONFIRMED: <CheckCircle className="w-4 h-4" />,
  SHIPPED: <Truck className="w-4 h-4" />,
  DELIVERED: <Package className="w-4 h-4" />,
  CANCELLED: <XCircle className="w-4 h-4" />,
};

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500",
  CONFIRMED: "bg-blue-500/10 text-blue-500",
  SHIPPED: "bg-purple-500/10 text-purple-500",
  DELIVERED: "bg-green-500/10 text-green-500",
  CANCELLED: "bg-red-500/10 text-red-500",
};

interface Order {
  id: string;
  client: {
    full_name: string;
    city: string;
  };
  product: {
    name: string;
  };
  quantity: number;
  total_price: number;
  status: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
        headers: { "Content-Type": "application/json" },
      });
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    } catch {
      console.error("Update failed");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-serif font-bold mb-2">Order Fulfillment</h1>
        <p className="text-gray-400">Track and manage customer commands in real-time.</p>
      </div>

      <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={6} className="px-6 py-6"><div className="h-8 bg-white/5 rounded w-full"></div></td>
                  </tr>
                ))
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02] transition-all">
                    <td className="px-6 py-4 font-mono text-xs text-gray-400">
                      #{order.id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold">{order.client.full_name}</p>
                      <p className="text-[10px] text-gray-500">{order.client.city}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-3 h-3 text-primary" />
                        <span className="text-sm">{order.product.name} (x{order.quantity})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold">
                      {Number(order.total_price).toLocaleString()} MAD
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                        {statusIcons[order.status]}
                        <span>{order.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-black/40 border border-white/10 rounded-lg text-xs p-1 outline-none focus:border-primary"
                      >
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirm</option>
                        <option value="SHIPPED">Ship</option>
                        <option value="DELIVERED">Deliver</option>
                        <option value="CANCELLED">Cancel</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
