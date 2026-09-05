import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import NewLeadNotificationEmail from "@/emails/new-lead-notification-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
import * as React from "react";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, companyName, projectType, budgetRange, timeline, description } = body;

    // Save lead to Supabase
    try {
      const { error: dbError } = await supabaseAdmin
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
      const emailResult = await sendEmail({
        to: process.env.LEAD_NOTIFICATION_EMAIL || "support@logicintelligencetechnologies.in",
        from: "noReply",
        replyTo: email,
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
      if (!emailResult.success) {
        console.error("[Email Error] Failed to send email:", emailResult.message);
      }
    } catch (emailErr) {
      console.error("[Email Error] Internal notification failed:", emailErr);
    }

    // 2. Send user confirmation
    try {
      const emailResult = await sendEmail({
        to: email,
        from: "hello",
        subject: "We received your request! (Logic Intelligence Technologies)",
        react: React.createElement(LeadConfirmationEmail, { fullName, service: projectType })
      });
      if (!emailResult.success) {
        console.error("[Email Error] Failed to send email:", emailResult.message);
      }
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
