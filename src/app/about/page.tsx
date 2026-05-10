import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FeedbackWidget from "@/components/layout/FeedbackWidget";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-lamp.png"
            alt="LuxHome Heritage"
            fill
            className="object-cover brightness-[0.3]"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Our Heritage</h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-medium tracking-widest uppercase text-xs mb-4 block">The Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8">Lighting as an Architectural Statement</h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
              Founded in Casablanca, LuxHome was born from a simple observation: most lighting fixtures are either functional or decorative, but rarely both at an architectural level.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We believe that light is the most important material in any interior. It defines boundaries, sets moods, and breathes life into static structures. Our mission is to provide discerning homeowners with pieces that serve as silent anchors of elegance.
            </p>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/images/hero-lamp.png"
              alt="Craftsmanship"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold mb-4">The Pillars of LuxHome</h2>
            <div className="w-16 h-0.5 bg-primary mx-auto opacity-50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Artisanal Precision", desc: "Every lamp is hand-assembled, ensuring that no two pieces are identical in their subtle character." },
              { title: "Sustainability", desc: "We use high-grade recyclable brass and energy-efficient LED cores designed to last for decades." },
              { title: "Customer Centricity", desc: "As an E-CRM validated brand, our relationship with you begins, not ends, at the point of purchase." }
            ].map((value, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl font-serif text-primary/20 mb-4 group-hover:text-primary/100 transition-colors duration-500">0{i+1}</div>
                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-24 bg-background">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif font-bold mb-12">Crafted by Visionaries</h2>
            <div className="flex justify-center">
               <div className="max-w-2xl text-lg text-muted-foreground italic">
                  &quot;Design is not just what it looks like and feels like. Design is how it works — and how it makes you feel when the sun goes down and the lights come up.&quot;
               </div>
            </div>
         </div>
      </section>

      <Footer />
      <FeedbackWidget />
    </main>
  );
}
