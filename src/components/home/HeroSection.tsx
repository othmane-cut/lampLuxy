"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-lamp.png"
          alt="LuxGlow Signature Lamp"
          fill
          className="object-cover object-center brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl text-white"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm mb-4 block"
          >
            The Art of Illumination
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
            LuxGlow <br />
            <span className="text-primary">Signature</span> Series
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed font-light">
            Architectural elegance meets modern technology. Experience the perfect harmony of form and light in your sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/product"
              className="bg-primary text-primary-foreground px-8 py-4 rounded-md font-bold flex items-center justify-center space-x-2 hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#gallery"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-md font-bold hover:bg-white/20 transition-all text-center"
            >
              View In Space
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
