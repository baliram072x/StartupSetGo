import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="text-xl font-heading font-bold mb-3">StartupSetGo</h3>
            <p className="text-background/60 text-sm leading-relaxed">
              From local to digital. We help small businesses build their online presence with custom websites and apps.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-background/80">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: "/", label: "Home" },
                { to: "/services", label: "Services" },
                { to: "/how-it-works", label: "How It Works" },
                { to: "/about", label: "About Us" },
              ].map((link) => (
                <Link key={link.to} to={link.to} className="text-sm text-background/50 hover:text-background transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-background/80">Services</h4>
            <div className="flex flex-col gap-2 text-sm text-background/50">
              <span>Website Development</span>
              <span>Mobile App Development</span>
              <span>Complete Digital Setup</span>
              <span>Maintenance & Support</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-background/80">Contact</h4>
            <div className="flex flex-col gap-2 text-sm text-background/50">
              <span>hello@startupsetgo.com</span>
              <span>+91 9527955039</span>
              <a
                href="https://wa.me/919527955039"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mt-1"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/40">
          <p>© {new Date().getFullYear()} StartupSetGo. All rights reserved. | Your Business, Online in Days.</p>
          <Link to="/login" className="hover:text-background transition-colors opacity-50">Admin Login</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
