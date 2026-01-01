import { Shield, Instagram, Youtube, MessageCircle, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="relative bg-rvx-dark border-t border-border">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-overlay opacity-10" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-10 h-10 text-primary" />
                <div>
                  <span className="font-orbitron font-bold text-2xl rvx-gradient-text">RVX ESPORTS</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Elite Free Fire Competitive Team. Built for Free Fire. Trained for Victory.
              </p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>RVX ESPORTS Base HQ — Global Operations</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-orbitron font-bold text-sm uppercase tracking-wider mb-4 text-foreground">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {["Home", "Roster", "Operations", "Achievements", "Media", "Recruitment"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="font-orbitron font-bold text-sm uppercase tracking-wider mb-4 text-foreground">
                Connect With RVX
              </h4>
              <div className="space-y-3">
                <a
                  href="https://instagram.com/rvx_esports__"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2 bg-muted rounded group-hover:bg-primary/10 transition-colors">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-sm">@rvx_esports__</span>
                </a>
                <a
                  href="https://youtube.com/@Rvx_esports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2 bg-muted rounded group-hover:bg-primary/10 transition-colors">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <span className="text-sm">Rvx_esports</span>
                </a>
                <a
                  href="https://discord.gg/FMSWT6UP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2 bg-muted rounded group-hover:bg-primary/10 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="text-sm">RVX ESPORTS Discord</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="p-2 bg-muted rounded group-hover:bg-primary/10 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">contact@rvxesports.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © 2024 <span className="text-primary font-orbitron">RVX ESPORTS</span>. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground italic">
            "Built for Free Fire. Trained for Victory."
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-primary/20" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-primary/20" />
    </footer>
  );
};

export default Footer;
