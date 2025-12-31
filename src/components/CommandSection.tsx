import { Star, Twitter, Instagram, Youtube } from "lucide-react";

const commanders = [
  {
    name: "RVX Commander",
    title: "Owner / Founder",
    rank: "5-Star General",
    description: "Visionary leader of RVX ESPORTS",
  },
  {
    name: "RVX Manager",
    title: "Team Manager",
    rank: "Colonel",
    description: "Operations & Strategy Lead",
  },
  {
    name: "RVX Coach",
    title: "Head Coach",
    rank: "Major",
    description: "Tactical Training & Development",
  },
  {
    name: "RVX Scout",
    title: "Analyst / Scout",
    rank: "Captain",
    description: "Talent Acquisition & Analysis",
  },
];

const CommandSection = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-secondary/30 border border-secondary/50 rounded text-sm text-secondary-foreground font-medium tracking-wider mb-4">
            LEADERSHIP
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="rvx-gradient-text">RVX ESPORTS</span> COMMAND UNIT
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            The strategic minds behind RVX ESPORTS success
          </p>
        </div>

        {/* Command Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commanders.map((commander, index) => (
            <div
              key={commander.name}
              className="group relative bg-card/80 backdrop-blur border border-border rounded-lg p-6 hover:border-primary/30 transition-all duration-300"
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-primary to-rvx-orange text-primary-foreground text-xs font-bold rounded">
                {commander.rank}
              </div>

              {/* Avatar Placeholder */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center border-2 border-primary/30 group-hover:border-primary transition-colors">
                <Star className="w-8 h-8 text-primary/50 group-hover:text-primary transition-colors" />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="font-orbitron font-bold text-lg mb-1">{commander.name}</h3>
                <p className="text-primary text-sm font-medium">{commander.title}</p>
                <p className="text-muted-foreground text-sm mt-2">{commander.description}</p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-border">
                {[Twitter, Instagram, Youtube].map((Icon, i) => (
                  <button
                    key={i}
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommandSection;
