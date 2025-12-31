import { Crosshair, Target, Shield, Crown } from "lucide-react";

const players = [
  {
    name: "RVX_Phoenix",
    role: "IGL / Captain",
    playstyle: "Strategic Command",
    icon: Crown,
    stats: { kills: "2.5K", kd: "4.2", winRate: "78%" },
  },
  {
    name: "RVX_Shadow",
    role: "Rusher",
    playstyle: "Close Combat",
    icon: Crosshair,
    stats: { kills: "3.1K", kd: "3.8", winRate: "72%" },
  },
  {
    name: "RVX_Viper",
    role: "Sniper",
    playstyle: "Long Range",
    icon: Target,
    stats: { kills: "2.8K", kd: "5.1", winRate: "81%" },
  },
  {
    name: "RVX_Titan",
    role: "Support",
    playstyle: "Team Anchor",
    icon: Shield,
    stats: { kills: "1.9K", kd: "2.9", winRate: "75%" },
  },
];

const RosterSection = () => {
  return (
    <section id="roster" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-rvx-charcoal via-background to-background" />
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded text-sm text-primary font-medium tracking-wider mb-4">
            COMBAT UNIT
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="rvx-gradient-text">RVX ESPORTS</span> ROSTER
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Meet the elite players of RVX ESPORTS Free Fire Division
          </p>
        </div>

        {/* Player Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {players.map((player, index) => (
            <div
              key={player.name}
              className="group relative bg-card/50 backdrop-blur border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-500 hud-corner"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Player Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-b from-muted to-card overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <player.icon className="w-20 h-20 text-primary/20 group-hover:text-primary/40 transition-colors" />
                </div>
                
                {/* Scan Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                
                {/* Status Indicator */}
                <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-background/80 rounded text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-500">ACTIVE</span>
                </div>
              </div>

              {/* Player Info */}
              <div className="p-5">
                <h3 className="font-orbitron text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                  {player.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                    {player.role}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{player.playstyle}</p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="font-orbitron text-sm font-bold text-primary">{player.stats.kills}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Kills</div>
                  </div>
                  <div className="text-center">
                    <div className="font-orbitron text-sm font-bold text-primary">{player.stats.kd}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">K/D</div>
                  </div>
                  <div className="text-center">
                    <div className="font-orbitron text-sm font-bold text-primary">{player.stats.winRate}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">Win%</div>
                  </div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RosterSection;
