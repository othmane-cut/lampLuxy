import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground mb-8">
              Ready to Illuminate Your Space?
            </h2>
            <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Join the hundreds of interior designers and homeowners who have elevated their sanctuary with LuxGlow.
            </p>
            <Link
              href="/product"
              className="inline-flex items-center space-x-3 bg-secondary text-secondary-foreground px-10 py-5 rounded-full font-bold hover:scale-105 transition-transform shadow-xl"
            >
              <span>Order Your Signature Lamp</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
