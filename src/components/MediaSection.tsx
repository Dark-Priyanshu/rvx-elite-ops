import { Play, ExternalLink } from "lucide-react";

const videos = [
  {
    title: "RVX ESPORTS Pro League Finals Highlights",
    thumbnail: "Championship winning moments",
    views: "125K",
  },
  {
    title: "Best of RVX_Phoenix - IGL Plays",
    thumbnail: "Strategic gameplay compilation",
    views: "89K",
  },
  {
    title: "RVX vs Elite Squad - Epic Match",
    thumbnail: "Tournament match highlights",
    views: "156K",
  },
];

const screenshots = [
  { title: "Victory Pose", description: "Championship celebration" },
  { title: "Team Coordination", description: "Tactical gameplay" },
  { title: "Clutch Moment", description: "1v4 victory" },
  { title: "Tournament Setup", description: "Stage presence" },
];

const MediaSection = () => {
  return (
    <section id="media" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-rvx-charcoal/30" />
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded text-sm text-primary font-medium tracking-wider mb-4">
            ARCHIVES
          </span>
          <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
            <span className="rvx-gradient-text">RVX ESPORTS</span> MEDIA
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Match highlights and epic moments from RVX ESPORTS
          </p>
        </div>

        {/* Video Highlights */}
        <div className="mb-16">
          <h3 className="font-orbitron text-xl font-bold mb-6 flex items-center gap-2">
            <Play className="w-5 h-5 text-primary" />
            Video Highlights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={video.title}
                className="group relative bg-card/50 backdrop-blur border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail Placeholder */}
                <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <Play className="w-16 h-16 text-primary/50 group-hover:text-primary group-hover:scale-125 transition-all duration-300 z-10" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h4 className="font-orbitron font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">{video.thumbnail}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-primary">{video.views} views</span>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshot Gallery */}
        <div>
          <h3 className="font-orbitron text-xl font-bold mb-6">Match Gallery</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {screenshots.map((screenshot, index) => (
              <div
                key={screenshot.title}
                className="group relative aspect-square bg-muted rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                {/* Placeholder Content */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-muted to-card">
                  <span className="font-orbitron text-xs text-muted-foreground text-center px-2">
                    {screenshot.title}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <h4 className="font-orbitron font-bold text-sm text-foreground">{screenshot.title}</h4>
                    <p className="text-xs text-muted-foreground">{screenshot.description}</p>
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

export default MediaSection;
