import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/30 bg-card/50">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="mb-4 inline-block overflow-hidden h-10 w-40 relative group">
            <img
              src={logo}
              alt="ClearFrame AI"
              className="absolute inset-x-0 h-[200%] w-auto max-w-none top-1/2 -translate-y-1/2 -ml-2 object-contain"
            />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-powered background removal with pixel-perfect precision.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Product</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/features" className="hover:text-foreground transition-colors">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link to="/api-docs" className="hover:text-foreground transition-colors">API Docs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Company</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
            <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-sm mb-3 text-foreground">Legal</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ClearFrame AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
