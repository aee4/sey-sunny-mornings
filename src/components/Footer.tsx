import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-4">Sey Good Morning</h3>
            <p className="text-sm text-primary-foreground/80">
              Fresh, healthy breakfast delivered to your doorstep every morning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-primary-foreground/80 hover:text-secondary transition-smooth">
                Home
              </Link>
              <Link to="/menu" className="text-sm text-primary-foreground/80 hover:text-secondary transition-smooth">
                Menu
              </Link>
              <Link to="/offers" className="text-sm text-primary-foreground/80 hover:text-secondary transition-smooth">
                Offers
              </Link>
              <Link to="/contact" className="text-sm text-primary-foreground/80 hover:text-secondary transition-smooth">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin size={16} className="mt-0.5 text-secondary" />
                <span className="text-sm text-primary-foreground/80">Accra, Ghana</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-secondary" />
                <a href="mailto:info@seygoodmorning.com" className="text-sm text-primary-foreground/80 hover:text-secondary transition-smooth">
                  info@seygoodmorning.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram size={16} className="text-secondary" />
                <a href="https://instagram.com/seygoodmorning" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/80 hover:text-secondary transition-smooth">
                  @seygoodmorning
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/20 text-center">
          <p className="text-sm text-primary-foreground/80">
            © 2025 Sey Good Morning | All rights reserved. Designed with love. Served with sunshine.
          </p>
          <p className="text-sm text-primary-foreground/80 mt-2">
            Designed by aee4
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
