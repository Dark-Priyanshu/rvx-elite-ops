import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RecruitmentData {
  playerName: string;
  ign: string;
  uid: string;
  role: string;
  experience: string;
  discord: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received recruitment email request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: RecruitmentData = await req.json();
    console.log("Processing application for:", data.playerName);

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    // Send notification email to team owner using Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "RVX ESPORTS <onboarding@resend.dev>",
        to: ["priyanshushakya016@gmail.com"],
        subject: `🎮 New Recruitment Application - ${data.playerName}`,
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
                  <td style="padding: 10px 0; color: #fff;">${data.playerName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Free Fire IGN:</td>
                  <td style="padding: 10px 0; color: #fff;">${data.ign}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Free Fire UID:</td>
                  <td style="padding: 10px 0; color: #fff;">${data.uid}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Preferred Role:</td>
                  <td style="padding: 10px 0; color: #f39c12; font-weight: bold;">${data.role.toUpperCase()}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Experience Level:</td>
                  <td style="padding: 10px 0; color: #fff;">${data.experience}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #888;">Discord/Contact:</td>
                  <td style="padding: 10px 0; color: #fff;">${data.discord}</td>
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
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
