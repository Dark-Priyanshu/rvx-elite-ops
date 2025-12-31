import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Roster", href: "#roster" },
  { name: "Operations", href: "#operations" },
  { name: "Achievements", href: "#achievements" },
  { name: "Media", href: "#media" },
  { name: "Recruitment", href: "#recruitment" },
  { name: "Contact", href: "#contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-10 h-10 text-primary animate-pulse-glow" />
              <div className="absolute inset-0 bg-primary/20 blur-xl" />
            </div>
            <div className="flex flex-col">
              <span className="font-orbitron font-bold text-xl md:text-2xl tracking-wider rvx-gradient-text">
                RVX ESPORTS
              </span>
              <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">
                Elite Strike Squad
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button 
              className="font-orbitron text-sm tracking-wider rvx-glow hover:scale-105 transition-transform"
              onClick={() => document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' })}
            >
              JOIN RVX ESPORTS
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded"
                >
                  {link.name}
                </a>
              ))}
              <Button 
                className="mt-4 font-orbitron text-sm tracking-wider"
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById('recruitment')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                JOIN RVX ESPORTS
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
