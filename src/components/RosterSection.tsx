import { Instagram } from "lucide-react";
import jaat18Image from "@/assets/team/jaat18.jpg";
import mayank16Image from "@/assets/team/mayank16.png";
import delete17Image from "@/assets/team/delete17.jpg";
import ansh19Image from "@/assets/team/ansh19.jpg";

const players = [
  {
    name: "RVX.JAAT18",
    role: "Secondary Rusher + IGL",
    playstyle: "Strategic Assault",
    image: jaat18Image,
    instagram: "amitjaat168",
  },
  {
    name: "RVX.MAYANK16",
    role: "Sniper",
    playstyle: "Long Range Precision",
    image: mayank16Image,
    instagram: "rvx.mayank16",
  },
  {
    name: "RVX.DELETE17",
    role: "Primary Rusher",
    playstyle: "Aggressive Entry",
    image: delete17Image,
    instagram: "arshbal06",
  },
  {
    name: "RVX.ANSH19",
    role: "Nader + Assaulter",
    playstyle: "Explosive Tactics",
    image: ansh19Image,
    instagram: "rvx._ansh19",
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
              {/* Player Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                
                {/* Scan Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                
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
                
                {/* Instagram Link */}
                <a
                  href={`https://instagram.com/${player.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@{player.instagram}</span>
                </a>
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
