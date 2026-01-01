import { useState, useEffect, useRef } from "react";
import { UserPlus, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

// Cloudflare Turnstile Site Key - Replace with your actual site key
const TURNSTILE_SITE_KEY = "0x4AAAAAABfp6VXlCSCXJ_j5";

// Validation schema
const recruitmentSchema = z.object({
  playerName: z.string().trim().min(1, "Player name is required").max(50, "Name too long (max 50)"),
  ign: z.string().trim().min(1, "IGN is required").max(30, "IGN too long (max 30)"),
  uid: z.string().trim().min(1, "UID is required").max(20, "UID too long (max 20)").regex(/^\d+$/, "UID must be numbers only"),
  role: z.enum(["rusher", "sniper", "support", "igl"], { errorMap: () => ({ message: "Select a valid role" }) }),
  experience: z.enum(["beginner", "intermediate", "advanced", "pro"], { errorMap: () => ({ message: "Select experience level" }) }),
  discord: z.string().trim().min(1, "Discord ID is required").max(50, "Discord ID too long (max 50)"),
});

declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "error-callback"?: () => void;
        "expired-callback"?: () => void;
        theme?: "light" | "dark" | "auto";
      }) => string;
      reset: (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

const RecruitmentSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileLoaded, setTurnstileLoaded] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [formData, setFormData] = useState({
    playerName: "",
    ign: "",
    uid: "",
    role: "",
    experience: "",
    discord: "",
  });

  // Load Turnstile script
  useEffect(() => {
    if (document.getElementById("turnstile-script")) {
      setTurnstileLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "turnstile-script";
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = () => setTurnstileLoaded(true);
    document.head.appendChild(script);
  }, []);

  // Render Turnstile widget
  useEffect(() => {
    if (turnstileLoaded && turnstileRef.current && window.turnstile && !widgetIdRef.current) {
      widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
        "error-callback": () => {
          setTurnstileToken(null);
        },
        "expired-callback": () => {
          setTurnstileToken(null);
        },
        theme: "dark",
      });
    }
  }, [turnstileLoaded]);

  const resetTurnstile = () => {
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
      setTurnstileToken(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!turnstileToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the security check.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Client-side validation
      const validatedData = recruitmentSchema.parse(formData);
      
      // Save to database
      const { error: dbError } = await supabase
        .from('recruitment_applications')
        .insert({
          player_name: validatedData.playerName,
          ign: validatedData.ign,
          uid: validatedData.uid,
          role: validatedData.role,
          experience: validatedData.experience,
          discord: validatedData.discord,
        });

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error("Failed to save application");
      }

      // Send email notification with turnstile token for verification
      const { data, error: emailError } = await supabase.functions.invoke('send-recruitment-email', {
        body: { ...validatedData, turnstileToken },
      });

      if (emailError) {
        console.error("Email error:", emailError);
        // Check if it's a CAPTCHA verification failure
        if (emailError.message?.includes("CAPTCHA") || emailError.message?.includes("verification")) {
          throw new Error("Security verification failed. Please try again.");
        }
        // Don't throw for other email errors - application is saved
      }

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
      
      // Reset turnstile for next submission
      resetTurnstile();
    } catch (error: any) {
      console.error("Submission error:", error);
      resetTurnstile();
      
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0]?.message || "Please check your input",
          variant: "destructive",
        });
      } else if (error.message?.includes("Too many")) {
        toast({
          title: "Rate Limited",
          description: "Too many applications. Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
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
                  maxLength={50}
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
                  maxLength={30}
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
                  placeholder="Your UID (numbers only)"
                  maxLength={20}
                  pattern="[0-9]*"
                  inputMode="numeric"
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
                  maxLength={50}
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>
            </div>

            {/* Turnstile CAPTCHA */}
            <div className="flex justify-center">
              <div ref={turnstileRef} />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full font-orbitron text-base tracking-wider gap-2 rvx-glow hover:scale-[1.02] transition-all duration-300"
              disabled={isSubmitting || !turnstileToken}
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
