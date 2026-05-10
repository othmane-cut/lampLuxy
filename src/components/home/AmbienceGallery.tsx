"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/images/hero-lamp.png", alt: "Living Room Setting", size: "col-span-2 row-span-2" },
  { src: "/images/hero-lamp.png", alt: "Modern Office", size: "col-span-1 row-span-1" },
  { src: "/images/hero-lamp.png", alt: "Elegant Bedroom", size: "col-span-1 row-span-1" },
];

const AmbienceGallery = () => {
  return (
    <section id="gallery" className="py-24 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Designed for Every Space</h2>
            <p className="text-muted-foreground text-lg">
              The LuxGlow Signature Lamp isn&apos;t just a light source; it&apos;s a statement piece that transforms the atmosphere of any room it occupies.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl font-serif opacity-10">LUXHOME</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-[600px]">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-xl ${image.size} group`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font-serif italic text-xl">{image.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmbienceGallery;
