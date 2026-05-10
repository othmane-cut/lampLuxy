"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function AdminProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product");
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setPrice(Number(data.price));
          setStock(data.stock);
          setDescription(data.description);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch("/api/product", {
        method: "PATCH",
        body: JSON.stringify({ name, price, stock, description }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save product:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Product Configuration</h1>
          <p className="text-gray-400">Manage your signature lamp details, pricing, and inventory.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center space-x-2 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : saved ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          <span>{saving ? "Saving..." : saved ? "Changes Saved" : "Save Changes"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: General Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5 space-y-6">
            <h2 className="text-xl font-serif font-bold italic mb-4">Core Details</h2>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Price (MAD)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white focus:border-primary outline-none transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white focus:border-primary outline-none transition-all resize-none"
              />
            </div>
          </div>

          <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
             <h2 className="text-xl font-serif font-bold italic mb-6">Gallery Management</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="relative aspect-square bg-black/30 rounded-lg border border-white/10 overflow-hidden group">
                   <Image src="/images/hero-lamp.png" alt="Product" fill className="object-cover" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="p-2 bg-red-500 rounded-full text-white">
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>
                <button className="aspect-square bg-black/20 border-2 border-dashed border-white/5 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:border-primary/50 hover:text-primary transition-all">
                   <Plus className="w-8 h-8 mb-2" />
                   <span className="text-xs font-bold uppercase tracking-widest">Add Image</span>
                </button>
             </div>
          </div>
        </div>

        {/* Right: Inventory & Status */}
        <div className="space-y-8">
           <div className="bg-[#1A1A1A] p-8 rounded-2xl border border-white/5">
              <h2 className="text-xl font-serif font-bold italic mb-6">Inventory</h2>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 block">Current Stock</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white focus:border-primary outline-none transition-all text-2xl font-bold"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl">
                   <span className="text-sm font-bold">In Stock Status</span>
                   <div className="w-10 h-5 bg-primary rounded-full relative">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
