"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  "Handcrafted Artisanal Components",
  "Adjustable Warmth Control (2700K - 4000K)",
  "Touch-Sensitive Seamless Dimming",
  "High CRI (>95) for Natural Colors",
  "5-Year Manufacturer Warranty",
  "Sustainability-First Sourcing"
];

const WhyLuxGlow = () => {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Why Discerning Homeowners Choose LuxGlow</h2>
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4"
                >
                  <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0" />
                  <span className="text-lg font-light text-muted-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-muted rounded-full flex items-center justify-center p-12 overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 animate-pulse"></div>
               <div className="relative z-10 text-center">
                  <span className="text-8xl font-serif font-bold text-primary/20">99%</span>
                  <p className="text-xl font-medium mt-4">Customer Satisfaction Rate</p>
                  <p className="text-muted-foreground mt-2">Based on 500+ verified owner feedbacks</p>
               </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border border-primary/20 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 border border-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLuxGlow;
