import { Trophy, Medal, Award, Star, Crown, Shield } from "lucide-react";

const achievements = [
  { icon: Crown, title: "Pro League Champion", description: "Season 5 Winner", tier: "gold" },
  { icon: Trophy, title: "Asia Finals Runner-up", description: "2024 Championship", tier: "silver" },
  { icon: Medal, title: "Regional Masters", description: "Top 3 Finish", tier: "bronze" },
  { icon: Award, title: "Best Team Play", description: "Community Award", tier: "special" },
  { icon: Star, title: "MVP Awards", description: "Multiple Players", tier: "gold" },
  { icon: Shield, title: "Undefeated Streak", description: "15 Wins in a Row", tier: "special" },
];

const tierStyles = {
  gold: "from-yellow-500/20 to-yellow-600/10 border-yellow-500/50 text-yellow-500",
  silver: "from-gray-400/20 to-gray-500/10 border-gray-400/50 text-gray-400",
  bronze: "from-orange-600/20 to-orange-700/10 border-orange-600/50 text-orange-600",
  special: "from-primary/20 to-rvx-orange/10 border-primary/50 text-primary",
};

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-20 md:py-32 relative overflow-hidden bg-muted/20">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded text-sm text-primary font-medium tracking-wider mb-4">
            HONOR ROLL
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="rvx-gradient-text">RVX ESPORTS</span> ACHIEVEMENTS
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Trophies, medals, and accolades earned on the battlefield
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={achievement.title}
              className={`group relative p-6 rounded-lg border bg-gradient-to-br ${tierStyles[achievement.tier as keyof typeof tierStyles]} hover:scale-105 transition-all duration-300`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-background/50 rounded-lg">
                  <achievement.icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-orbitron font-bold text-lg text-foreground">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                </div>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
