import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email/send-email";
import ChecklistSubmissionEmail from "@/emails/checklist-submission-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
import { env } from "@/config/env";
import { z } from "zod";
import * as React from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
const supabase = createClient(supabaseUrl, supabaseKey);

const schema = z.object({
  email: z.string().email("Invalid email address").optional(),
  answers: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid input", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }
    
    const { answers = [], email, type } = parsed.data as any;
    const isLeadMagnet = type === "lead_magnet";

    // 1. Insert into Supabase
    if (env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { error: dbError } = await supabase
          .from("checklist_leads")
          .insert([
            { 
              name: "Anonymous",
              email: email || "unknown@example.com", 
              company: isLeadMagnet ? "Lead Magnet" : (answers[1] || ""),
              role: isLeadMagnet ? "Downloaded Checklist" : (answers[2] || ""),
            }
          ]);
        
        if (dbError) {
          console.error("[DB Error] Failed to insert checklist submission:", dbError);
        }
      } catch (dbErr) {
        console.error("[DB Error] Checklist insert exception:", dbErr);
      }
    }

    // 2. Send confirmation email to user (if they provided email)
    if (email) {
      try {
        await sendEmail({
          to: email,
          subject: isLeadMagnet ? "Your Website Launch Checklist" : "We received your request! (Logic Intelligence Technologies)",
          react: React.createElement(LeadConfirmationEmail, {
            fullName: "there",
            service: isLeadMagnet ? "Website Launch Checklist" : "Client Discovery Form",
          }),
        });
      } catch (emailErr) {
        console.error("[Email Error] Checklist user confirmation failed:", emailErr);
      }
    }

    // 3. Send Internal Notification Email
    try {
      await sendEmail({
        to: env.LEAD_NOTIFICATION_EMAIL,
        replyTo: email || undefined,
        subject: isLeadMagnet ? `New Lead Magnet Download: ${email}` : `New Client Discovery Form: ${email || 'Anonymous'}`,
        react: isLeadMagnet 
          ? React.createElement("div", null, `Lead Magnet downloaded by ${email}`)
          : React.createElement(ChecklistSubmissionEmail, {
            email: email || 'Not provided', 
            answers: answers, 
            submissionDate: new Date().toISOString()
          }),
      });
    } catch (emailErr) {
      console.error("[Email Error] Checklist internal notification failed:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Checklist received" });
  } catch (error) {
    console.error("Checklist API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
