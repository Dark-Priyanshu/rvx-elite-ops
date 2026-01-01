import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://rvxesports.com",
  "https://www.rvxesports.com",
  "https://wuwwvayjjuczwikxvsys.lovableproject.com",
];

// Check if origin is allowed (also allow localhost for development)
function getAllowedOrigin(origin: string | null): string {
  if (!origin) return ALLOWED_ORIGINS[0];
  if (ALLOWED_ORIGINS.includes(origin)) return origin;
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) return origin;
  return ALLOWED_ORIGINS[0];
}

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin");
  return {
    "Access-Control-Allow-Origin": getAllowedOrigin(origin),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

interface RecruitmentData {
  playerName: string;
  ign: string;
  uid: string;
  role: string;
  experience: string;
  discord: string;
}

// Simple in-memory rate limiting (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 3; // max 3 applications per IP per hour
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }
  
  if (record.count >= RATE_LIMIT) {
    return true;
  }
  
  record.count++;
  return false;
}

// Input validation
function validateInput(data: RecruitmentData): string | null {
  const validRoles = ['rusher', 'sniper', 'support', 'igl'];
  const validExperience = ['beginner', 'intermediate', 'advanced', 'pro'];
  
  // Check required fields
  if (!data.playerName || !data.ign || !data.uid || !data.role || !data.experience || !data.discord) {
    return "All fields are required";
  }
  
  // Length validation
  if (data.playerName.length > 50) return "Player name too long (max 50 characters)";
  if (data.ign.length > 30) return "IGN too long (max 30 characters)";
  if (data.uid.length > 20) return "UID too long (max 20 characters)";
  if (data.discord.length > 50) return "Discord ID too long (max 50 characters)";
  
  // UID should be numeric
  if (!/^\d+$/.test(data.uid)) return "UID must contain only numbers";
  
  // Validate role and experience are from allowed values
  if (!validRoles.includes(data.role)) return "Invalid role selected";
  if (!validExperience.includes(data.experience)) return "Invalid experience level";
  
  // Basic sanitization check for malicious content
  const suspiciousPatterns = /<script|javascript:|data:|onclick|onerror/i;
  const allFields = [data.playerName, data.ign, data.discord];
  for (const field of allFields) {
    if (suspiciousPatterns.test(field)) {
      return "Invalid characters detected";
    }
  }
  
  return null;
}

// Sanitize text for email
function sanitizeForEmail(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received recruitment email request");
  
  const corsHeaders = getCorsHeaders(req);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    console.log("Request from IP:", clientIP);
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      console.log("Rate limited:", clientIP);
      return new Response(
        JSON.stringify({ error: "Too many applications. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const data: RecruitmentData = await req.json();
    
    // Validate input
    const validationError = validateInput(data);
    if (validationError) {
      console.log("Validation error:", validationError);
      return new Response(
        JSON.stringify({ error: validationError }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    console.log("Processing application for:", data.playerName);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Sanitize data for email
    const safeData = {
      playerName: sanitizeForEmail(data.playerName),
      ign: sanitizeForEmail(data.ign),
      uid: sanitizeForEmail(data.uid),
      role: sanitizeForEmail(data.role),
      experience: sanitizeForEmail(data.experience),
      discord: sanitizeForEmail(data.discord),
    };

    // Send notification email to team owner using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RVX ESPORTS <onboarding@resend.dev>",
        to: ["amitchoudhary0168@gmail.com"],
        subject: `🎮 New Recruitment Application - ${safeData.playerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 30px; border-radius: 10px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #f39c12; margin: 0;">🎮 RVX ESPORTS</h1>
              <p style="color: #888; margin: 5px 0;">New Player Application</p>
            </div>
            
            <div style="background: #16213e; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #f39c12; margin-top: 0;">Player Details</h2>
              
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; color: #888; width: 40%;">Player Name:</td>
                  <td style="padding: 10px 0; color: #fff;">${safeData.playerName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Free Fire IGN:</td>
                  <td style="padding: 10px 0; color: #fff;">${safeData.ign}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Free Fire UID:</td>
                  <td style="padding: 10px 0; color: #fff;">${safeData.uid}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Preferred Role:</td>
                  <td style="padding: 10px 0; color: #f39c12; font-weight: bold;">${safeData.role.toUpperCase()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Experience Level:</td>
                  <td style="padding: 10px 0; color: #fff;">${safeData.experience}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Discord/Contact:</td>
                  <td style="padding: 10px 0; color: #fff;">${safeData.discord}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; color: #888; font-size: 12px;">
              <p>This application was submitted through the RVX ESPORTS website.</p>
              <p>Contact the player via Discord to proceed with the tryout.</p>
            </div>
          </div>
        `,
      }),
    });

    const emailResult = await emailResponse.json();
    console.log("Email sent successfully:", emailResult);

    if (!emailResponse.ok) {
      throw new Error(emailResult.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending recruitment email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...getCorsHeaders(req) },
      }
    );
  }
};

serve(handler);
