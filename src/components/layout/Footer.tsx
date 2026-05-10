import Link from "next/link";
import { Globe, Mail, Phone, MapPin, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="text-2xl font-serif font-bold tracking-wider text-primary mb-6 block">
              LUXHOME
            </Link>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Exquisite architectural lighting designed to transform your living space into a sanctuary of elegance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Send className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary transition-colors"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/product" className="text-muted-foreground hover:text-primary transition-colors">Collection</Link></li>
              <li><Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Luxury Ave, Casablanca, Morocco</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-primary" />
                <span>+212 522 000 000</span>
              </li>
              <li className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>contact@luxhome.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Feedback Placeholder */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-6">Feedback</h4>
            <p className="text-muted-foreground mb-4">We value your thoughts on our signature collection.</p>
            {/* Feedback Widget will be integrated here or as a separate sticky element */}
            <div className="flex">
               <Link href="#feedback" className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium">
                  Share Experience
               </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-muted/20 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} LuxHome Signature. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
