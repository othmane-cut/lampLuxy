"use client";

import { Bell, Search } from "lucide-react";

const AdminHeader = () => {
  return (
    <header className="h-20 bg-[#1A1A1A]/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-8 z-20">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search analytics, clients, or orders..."
            className="w-full bg-black/30 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm focus:border-primary/50 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-white/5 mx-2"></div>
        
        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Administrator</p>
            <p className="text-[10px] text-primary uppercase tracking-widest font-bold">Main System</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold border-2 border-white/10 shadow-lg">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
