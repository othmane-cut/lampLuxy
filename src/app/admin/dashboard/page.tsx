"use client";

import { motion } from "framer-motion";
import KPICard from "@/components/admin/dashboard/KPICard";
import { 
  DollarSign, 
  Users, 
  ShoppingBag, 
  BarChart3, 
  TrendingUp, 
  Star 
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 8000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 9000 },
];

const segmentData = [
  { name: "Dormant", value: 15 },
  { name: "Passive", value: 25 },
  { name: "Active", value: 40 },
  { name: "Highly Engaged", value: 20 },
];

const COLORS = ["#3F3F3F", "#6B6B6B", "#A07830", "#C9A84C"];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif font-bold mb-2"
          >
            E-CRM Overview
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Real-time performance and customer health metrics.
          </motion.p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-bold transition-all">Export PDF</button>
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20">Refresh Data</button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard title="Total Revenue" value="124,500 MAD" icon={DollarSign} trend="+12.5%" isPositive delay={0.1} />
        <KPICard title="Active Clients" value="1,240" icon={Users} trend="+5.2%" isPositive delay={0.2} />
        <KPICard title="Total Orders" value="856" icon={ShoppingBag} trend="-2.1%" isPositive={false} delay={0.3} />
        <KPICard title="Avg. Loyalty Score" value="8.4/10" icon={Star} trend="+0.5" isPositive delay={0.4} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Line Chart */}
        <div className="lg:col-span-2 bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif font-bold italic">Revenue Growth</h3>
            <select className="bg-black/30 border border-white/5 rounded-lg p-2 text-xs outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2A2A" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#6B6B6B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#6B6B6B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: "8px" }}
                  itemStyle={{ color: "#C9A84C" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#C9A84C" 
                  strokeWidth={4} 
                  dot={{ fill: "#C9A84C", r: 6 }} 
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Pie Chart */}
        <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
          <h3 className="text-xl font-serif font-bold mb-8 italic">Engagement Tiers</h3>
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {segmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">1.2k</span>
              <span className="text-[10px] text-gray-500 uppercase">Total Clients</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {segmentData.map((entry, index) => (
              <div key={entry.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-gray-400">{entry.name}</span>
                </div>
                <span className="font-bold">{entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CRM Activity Section Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-serif font-bold italic">Top Cities</h3>
            <BarChart3 className="w-5 h-5 text-gray-500" />
          </div>
          <div className="space-y-4">
             {[
               { city: "Casablanca", orders: 450, percentage: 85 },
               { city: "Rabat", orders: 210, percentage: 60 },
               { city: "Marrakech", orders: 120, percentage: 40 },
               { city: "Tangier", orders: 76, percentage: 25 },
             ].map((item) => (
               <div key={item.city}>
                 <div className="flex justify-between text-sm mb-1">
                   <span>{item.city}</span>
                   <span className="text-gray-500">{item.orders} orders</span>
                 </div>
                 <div className="w-full bg-black/30 h-1.5 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: `${item.percentage}%` }}
                     className="h-full bg-primary"
                   ></motion.div>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
           <h3 className="text-xl font-serif font-bold mb-6 italic">Recent Feedbacks</h3>
           <div className="space-y-6">
              {[
                { user: "Othmane L.", msg: "The LuxGlow lamp transformed my workspace. Exceptional quality!", date: "2h ago" },
                { user: "Sarah K.", msg: "Fast delivery to Rabat. The gold finish is even better in person.", date: "5h ago" },
                { user: "Hamza M.", msg: "Minimalist perfection. Worth every MAD.", date: "1d ago" },
              ].map((fb, i) => (
                <div key={i} className="flex space-x-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">
                      {fb.user[0]}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold">{fb.user}</h4>
                        <span className="text-[10px] text-gray-500 uppercase">{fb.date}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2">"{fb.msg}"</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
