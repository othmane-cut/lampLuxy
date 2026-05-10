"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Lamp, 
  Mail, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { name: "Clients", icon: Users, href: "/admin/clients" },
  { name: "Orders", icon: ShoppingBag, href: "/admin/orders" },
  { name: "Feedbacks", icon: MessageSquare, href: "/admin/feedbacks" },
  { name: "Product", icon: Lamp, href: "/admin/product" },
  { name: "Campaigns", icon: Mail, href: "/admin/campaigns" },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#1A1A1A] border-r border-white/5 flex flex-col hidden md:flex">
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-8 border-b border-white/5">
        <Link href="/admin/dashboard" className="text-xl font-serif font-bold text-primary tracking-widest">
          LUXHOME
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between p-3 rounded-lg transition-all group ${
                isActive 
                ? "bg-primary text-primary-foreground" 
                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && (
                <motion.div layoutId="active-pill">
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 text-gray-400 hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
