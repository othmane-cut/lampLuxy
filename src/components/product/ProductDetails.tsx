"use client";

import { useState, useEffect } from "react";
import { Star, Truck, Shield, Loader2 } from "lucide-react";
import OrderForm from "./OrderForm";

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product");
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <span className="text-primary font-medium tracking-widest uppercase text-xs mb-2 block">Premium Collection</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{product.name}</h1>
        
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <span className="text-muted-foreground text-sm">(128 Verified Reviews)</span>
        </div>
        
        <div className="text-3xl font-serif font-bold text-primary mb-6">
          {Number(product.price).toLocaleString()} MAD
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
          {product.description}
        </p>
      </div>

      {/* Order Form Section */}
      <div className="bg-muted/30 p-8 rounded-2xl border border-border mb-12">
        <h3 className="text-xl font-serif font-bold mb-6">Place Your Order</h3>
        <OrderForm />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="flex items-start space-x-3">
          <Truck className="w-6 h-6 text-primary mt-1" />
          <div>
            <h4 className="font-bold text-sm">Free Express Shipping</h4>
            <p className="text-xs text-muted-foreground">Across all cities in Morocco</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-primary mt-1" />
          <div>
            <h4 className="font-bold text-sm">5-Year Warranty</h4>
            <p className="text-xs text-muted-foreground">Peace of mind guaranteed</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-border pt-8">
        <div className="flex space-x-8 mb-6 border-b border-border">
          {["description", "specifications", "shipping"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
                activeTab === tab ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="text-sm text-muted-foreground leading-relaxed">
          {activeTab === "description" && (
            <p>
              {product.long_description || "The LuxGlow Signature Lamp is more than just a lighting fixture; it is a masterpiece of modern design. Every unit is hand-assembled by our master craftsmen, ensuring that the warm gold finish is perfectly applied to the high-grade brass components."}
            </p>
          )}
          {activeTab === "specifications" && (
            <ul className="space-y-2">
              <li><span className="font-bold text-foreground">Dimensions:</span> 45cm x 20cm x 20cm</li>
              <li><span className="font-bold text-foreground">Material:</span> Solid Brass, Artisanal Glass</li>
              <li><span className="font-bold text-foreground">Light:</span> Integrated LED (2700K - 4000K)</li>
              <li><span className="font-bold text-foreground">Power:</span> USB-C Rechargeable / Plug-in</li>
            </ul>
          )}
          {activeTab === "shipping" && (
            <p>
              We offer free express delivery to all Moroccan cities within 2-4 business days. Your lamp will be packaged in a premium, impact-resistant collector&apos;s box.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
