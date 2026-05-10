import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductDetails from "@/components/product/ProductDetails";
import FeedbackWidget from "@/components/layout/FeedbackWidget";

export default function ProductPage() {
  return (
    <main className="min-h-screen pt-20 bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Gallery */}
          <ProductGallery />
          
          {/* Right: Details & Order Form */}
          <ProductDetails />
        </div>
      </div>
      
      <Footer />
      <FeedbackWidget />
    </main>
  );
}
