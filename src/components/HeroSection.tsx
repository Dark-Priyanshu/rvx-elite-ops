import { ChevronDown, Play, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-rvx-charcoal">
        {/* Grid Overlay */}
        <div className="absolute inset-0 grid-overlay opacity-50" />
        
        {/* Radar Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10">
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full" />
          <div className="absolute inset-[100px] border border-primary/20 rounded-full" />
          <div className="absolute inset-[200px] border border-primary/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 w-1 h-1/2 bg-gradient-to-b from-primary/50 to-transparent origin-top animate-radar" />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        {/* Scan Line Effect */}
        <div className="absolute inset-0 scan-line" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-8 animate-fade-in-up">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary tracking-wider">FREE FIRE COMPETITIVE TEAM</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-black mb-6 animate-fade-in-up animation-delay-100">
          <span className="rvx-gradient-text text-shadow-glow animate-glitch">RVX ESPORTS</span>
          <br />
          <span className="text-foreground text-2xl md:text-4xl lg:text-5xl font-bold mt-4 block">
            ELITE FREE FIRE STRIKE SQUAD
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up animation-delay-200">
          Official Competitive Free Fire Esports Team — Dominating the battlefield with tactical precision and elite teamwork.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
          <Button 
            size="lg" 
            className="font-orbitron text-base tracking-wider gap-2 rvx-glow hover:scale-105 transition-all duration-300 group"
            onClick={() => document.getElementById('roster')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
            View RVX Roster
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="font-orbitron text-base tracking-wider gap-2 border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 group"
          >
            <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch RVX Highlights
          </Button>
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-in-up animation-delay-400">
          {[
            { value: "500+", label: "Matches" },
            { value: "85%", label: "Win Rate" },
            { value: "20+", label: "Trophies" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-orbitron text-2xl md:text-3xl font-bold rvx-gradient-text">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-primary/50" />
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-20 left-4 w-20 h-20 border-l-2 border-t-2 border-primary/30" />
      <div className="absolute top-20 right-4 w-20 h-20 border-r-2 border-t-2 border-primary/30" />
      <div className="absolute bottom-4 left-4 w-20 h-20 border-l-2 border-b-2 border-primary/30" />
      <div className="absolute bottom-4 right-4 w-20 h-20 border-r-2 border-b-2 border-primary/30" />
    </section>
  );
};

export default HeroSection;
