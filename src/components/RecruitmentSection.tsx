import { useState } from "react";
import { UserPlus, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const RecruitmentSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    playerName: "",
    ign: "",
    uid: "",
    role: "",
    experience: "",
    discord: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted!",
      description: "Your request to join RVX ESPORTS has been received. We'll contact you soon.",
    });
    
    setFormData({
      playerName: "",
      ign: "",
      uid: "",
      role: "",
      experience: "",
      discord: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="recruitment" className="py-20 md:py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
              <UserPlus className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium tracking-wider">NOW RECRUITING</span>
            </div>
            <h2 className="font-orbitron text-3xl md:text-5xl font-bold mb-4">
              JOIN <span className="rvx-gradient-text">RVX ESPORTS</span>
            </h2>
            <p className="text-muted-foreground">
              Free Fire Division — Apply to become part of the elite squad
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-card/50 backdrop-blur border border-border rounded-lg p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Player Name */}
              <div className="space-y-2">
                <Label htmlFor="playerName" className="font-orbitron text-sm">
                  Player Name
                </Label>
                <Input
                  id="playerName"
                  name="playerName"
                  value={formData.playerName}
                  onChange={handleChange}
                  placeholder="Your real name"
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              {/* Free Fire IGN */}
              <div className="space-y-2">
                <Label htmlFor="ign" className="font-orbitron text-sm">
                  Free Fire IGN
                </Label>
                <Input
                  id="ign"
                  name="ign"
                  value={formData.ign}
                  onChange={handleChange}
                  placeholder="In-game name"
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              {/* UID */}
              <div className="space-y-2">
                <Label htmlFor="uid" className="font-orbitron text-sm">
                  Free Fire UID
                </Label>
                <Input
                  id="uid"
                  name="uid"
                  value={formData.uid}
                  onChange={handleChange}
                  placeholder="Your UID"
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              {/* Role Preference */}
              <div className="space-y-2">
                <Label htmlFor="role" className="font-orbitron text-sm">
                  Role Preference
                </Label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-3 bg-background/50 border border-border rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select role</option>
                  <option value="rusher">Rusher</option>
                  <option value="sniper">Sniper</option>
                  <option value="support">Support</option>
                  <option value="igl">IGL (In-Game Leader)</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience" className="font-orbitron text-sm">
                  Experience Level
                </Label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="w-full h-10 px-3 bg-background/50 border border-border rounded-md text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select level</option>
                  <option value="beginner">Beginner (0-1 years)</option>
                  <option value="intermediate">Intermediate (1-2 years)</option>
                  <option value="advanced">Advanced (2-4 years)</option>
                  <option value="pro">Pro (4+ years)</option>
                </select>
              </div>

              {/* Discord ID */}
              <div className="space-y-2">
                <Label htmlFor="discord" className="font-orbitron text-sm">
                  Discord ID / Contact
                </Label>
                <Input
                  id="discord"
                  name="discord"
                  value={formData.discord}
                  onChange={handleChange}
                  placeholder="username#0000"
                  required
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full font-orbitron text-base tracking-wider gap-2 rvx-glow hover:scale-[1.02] transition-all duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  REQUEST TO JOIN RVX ESPORTS
                </>
              )}
            </Button>

            {/* Info Note */}
            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to follow RVX ESPORTS team guidelines and code of conduct.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RecruitmentSection;
