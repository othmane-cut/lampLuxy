"use client";

import { useEffect, useState } from "react";
import { TierBadge, SegmentBadge } from "@/components/admin/clients/Badges";
import { Search, Filter, Download, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

interface Client {
  id: string;
  fullName: string;
  email: string;
  city: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  tier: string;
  segment: string;
  frequency: number;
  score: number;
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch("/api/admin/clients");
        const data = await res.json();
        setClients(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const filteredClients = clients.filter(c => 
    c.fullName.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Client Management</h1>
          <p className="text-gray-400">Detailed overview of your customer base and their CRM health.</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white/5 hover:bg-white/10 p-3 rounded-lg text-sm font-bold transition-all">
            <Download className="w-5 h-5" />
          </button>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">
            Add Manual Client
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-[#1A1A1A] p-4 rounded-xl border border-white/5 flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-primary/50 outline-none transition-all"
          />
        </div>
        <div className="flex space-x-2">
          <button className="bg-black/30 border border-white/10 px-4 py-2 rounded-lg text-xs flex items-center space-x-2 hover:bg-white/5">
            <Filter className="w-3 h-3" />
            <span>Filter Tier</span>
          </button>
          <button className="bg-black/30 border border-white/10 px-4 py-2 rounded-lg text-xs flex items-center space-x-2 hover:bg-white/5">
            <Filter className="w-3 h-3" />
            <span>Engagement</span>
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-[#1A1A1A] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Orders</th>
                <th className="px-6 py-4">Total Spent</th>
                <th className="px-6 py-4">CRM Metrics</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-4"><div className="h-10 w-40 bg-white/5 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-20 bg-white/5 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-10 bg-white/5 rounded mx-auto"></div></td>
                    <td className="px-6 py-4"><div className="h-6 w-24 bg-white/5 rounded"></div></td>
                    <td className="px-6 py-4"><div className="h-8 w-32 bg-white/5 rounded"></div></td>
                    <td className="px-6 py-4"></td>
                  </tr>
                ))
              ) : filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <motion.tr 
                    key={client.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {client.fullName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold group-hover:text-primary transition-colors">{client.fullName}</p>
                          <p className="text-[10px] text-gray-500">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p>{client.city}</p>
                      <p className="text-[10px] text-gray-500">{client.phone}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-white/5 px-2 py-1 rounded text-xs font-bold">
                        {client.orderCount}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      {Number(client.totalSpent).toLocaleString()} MAD
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <TierBadge tier={client.tier} />
                          <SegmentBadge segment={client.segment} />
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className="text-[9px] text-gray-500">Freq: {client.frequency.toFixed(1)}</span>
                           <span className="text-[9px] text-gray-500">Score: {client.score}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4 text-gray-500" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-gray-500 italic">
                    No clients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
