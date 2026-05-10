import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProductHighlight from "@/components/home/ProductHighlight";
import AmbienceGallery from "@/components/home/AmbienceGallery";
import WhyLuxGlow from "@/components/home/WhyLuxGlow";
import CTABanner from "@/components/home/CTABanner";
import FeedbackWidget from "@/components/layout/FeedbackWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ProductHighlight />
      <AmbienceGallery />
      <WhyLuxGlow />
      <CTABanner />
      <Footer />
      <FeedbackWidget />
    </main>
  );
}
