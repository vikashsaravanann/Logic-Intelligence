import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email/send-email";
import NewLeadNotificationEmail from "../../../../emails/new-lead-notification-email";
import LeadConfirmationEmail from "../../../../emails/lead-confirmation-email";
import * as React from "react";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, projectType, budgetRange, timeline, description } = body;

    // Save lead to Supabase
    try {
      const { error: dbError } = await supabase
        .from("contact_leads")
        .insert([
          { 
            name: fullName, 
            email, 
            company: companyName,
            message: description
          }
        ]);
      
      if (dbError) {
        console.error("[DB Error] Contact lead insert:", dbError);
      }
    } catch (dbErr) {
      console.error("[DB Error] Contact lead insert exception:", dbErr);
    }

    // 1. Send internal notification (don't let failure block user confirmation)
    try {
      await sendEmail({
        to: process.env.LEAD_NOTIFICATION_EMAIL || "contact@logicintelligencetechnologies.in",
        subject: `New Lead: ${projectType} from ${fullName}`,
        react: React.createElement(NewLeadNotificationEmail, {
          fullName,
          email,
          phone: phone || "N/A",
          companyName: companyName || "N/A",
          service: projectType,
          requirements: `Budget: ${budgetRange} | Timeline: ${timeline}\n\n${description}`,
          submissionDate: new Date().toISOString()
        })
      });
    } catch (emailErr) {
      console.error("[Email Error] Internal notification failed:", emailErr);
    }

    // 2. Send user confirmation
    try {
      await sendEmail({
        to: email,
        subject: "We received your request! (Logic Intelligence Technologies)",
        react: React.createElement(LeadConfirmationEmail, { fullName, service: projectType })
      });
    } catch (emailErr) {
      console.error("[Email Error] User confirmation failed:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
