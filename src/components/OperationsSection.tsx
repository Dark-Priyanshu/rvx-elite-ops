import { useEffect, useState } from "react";
import { Trophy, Target, Medal, Flame } from "lucide-react";

const tournaments = [
  { name: "Free Fire Pro League Season 5", position: "1st Place", year: "2024", prize: "$50,000" },
  { name: "Asia Championship Finals", position: "2nd Place", year: "2024", prize: "$30,000" },
  { name: "Global Series Qualifiers", position: "1st Place", year: "2023", prize: "$25,000" },
  { name: "Regional Masters Cup", position: "3rd Place", year: "2023", prize: "$15,000" },
];

const stats = [
  { icon: Target, value: 500, suffix: "+", label: "Matches Played" },
  { icon: Trophy, value: 425, suffix: "", label: "Victories" },
  { icon: Medal, value: 85, suffix: "%", label: "Win Rate" },
  { icon: Flame, value: 20, suffix: "+", label: "Top Finishes" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const OperationsSection = () => {
  return (
    <section id="operations" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-rvx-charcoal/50 to-background" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded text-sm text-primary font-medium tracking-wider mb-4">
            BATTLE LOG
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="rvx-gradient-text">RVX ESPORTS</span> OPERATIONS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Free Fire Tournament History & Statistics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="relative bg-card/50 backdrop-blur border border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors group"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <div className="font-orbitron text-3xl md:text-4xl font-bold rvx-gradient-text">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tournament Cards */}
        <div className="space-y-4">
          <h3 className="font-orbitron text-xl font-bold mb-6 text-center md:text-left">
            Recent Tournaments
          </h3>
          <div className="grid gap-4">
            {tournaments.map((tournament, index) => (
              <div
                key={tournament.name}
                className="group flex flex-col md:flex-row md:items-center justify-between p-5 bg-card/50 backdrop-blur border border-border rounded-lg hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3 md:mb-0">
                  <div className={`w-12 h-12 rounded flex items-center justify-center ${
                    tournament.position.includes("1st") ? "bg-yellow-500/20 text-yellow-500" :
                    tournament.position.includes("2nd") ? "bg-gray-400/20 text-gray-400" :
                    "bg-orange-600/20 text-orange-600"
                  }`}>
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-orbitron font-bold text-foreground group-hover:text-primary transition-colors">
                      {tournament.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">{tournament.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className={`font-orbitron font-bold ${
                      tournament.position.includes("1st") ? "text-yellow-500" :
                      tournament.position.includes("2nd") ? "text-gray-400" :
                      "text-orange-600"
                    }`}>
                      {tournament.position}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-orbitron font-bold text-primary">{tournament.prize}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OperationsSection;
