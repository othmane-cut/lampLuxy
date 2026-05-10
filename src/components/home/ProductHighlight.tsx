"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Palette } from "lucide-react";

const features = [
  {
    icon: <Palette className="w-8 h-8" />,
    title: "Timeless Design",
    description: "Minimalist architectural form that complements any interior aesthetic from classic to contemporary."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Eco-Efficiency",
    description: "Advanced LED technology providing warm, natural light while consuming 80% less energy."
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Premium Materials",
    description: "Hand-finished brass and artisanal glass crafted to last for generations of illumination."
  }
];

const ProductHighlight = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Crafted For Excellence</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="p-8 rounded-2xl bg-muted/50 hover:bg-muted transition-colors text-center border border-transparent hover:border-primary/20"
            >
              <div className="text-primary mb-6 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductHighlight;
