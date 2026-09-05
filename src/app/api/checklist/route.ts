import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import ChecklistSubmissionEmail from "@/emails/checklist-submission-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
import ChecklistDownloadEmail from "@/emails/checklist-download-email";
import NewLeadNotificationEmail from "@/emails/new-lead-notification-email";
import { env } from "@/config/env";
import { z } from "zod";
import * as React from "react";
import path from "path";
import fs from "fs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email("Invalid email address").optional(),
  answers: z.array(z.string()).optional(),
  // "lead_magnet" = /checklist free-PDF form. Absent = /discovery questionnaire.
  type: z.string().optional(),
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
    const displayName = email ? email.split("@")[0] : "there";

    // 1. Insert into Supabase
    if (env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { error: dbError } = await supabaseAdmin
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
    // - Lead magnet (/checklist page)  -> ChecklistDownloadEmail + PDF attachment
    // - Discovery form (/discovery page) -> LeadConfirmationEmail for the questionnaire
    if (email) {
      try {
        let attachments: any[] = [];
        if (isLeadMagnet) {
           const pdfPath = path.join(process.cwd(), 'public', 'checklist.pdf');
           if (fs.existsSync(pdfPath)) {
               attachments.push({
                   filename: 'Website-Launch-Checklist.pdf',
                   path: pdfPath
               });
           }
        }

        const emailResult = await sendEmail({
          to: email,
          from: "noReply",
          subject: isLeadMagnet ? "Your Free Website Launch Checklist (PDF Inside)" : "We received your discovery responses!",
          react: isLeadMagnet
            ? React.createElement(ChecklistDownloadEmail, { fullName: displayName })
            : React.createElement(LeadConfirmationEmail, {
                fullName: displayName,
                service: "Project Discovery Questionnaire",
              }),
          attachments: attachments.length > 0 ? attachments : undefined
        });
      if (!emailResult.success) {
        console.error("[Email Error] Failed to send email:", emailResult.message);
      }
      } catch (emailErr) {
        console.error("[Email Error] Checklist user confirmation failed:", emailErr);
      }
    }

    // 3. Send Internal Notification Email
    // - Lead magnet  -> NewLeadNotificationEmail (checklist download)
    // - Discovery    -> ChecklistSubmissionEmail (full answers)
    try {
      const emailResult = await sendEmail({
        to: env.LEAD_NOTIFICATION_EMAIL,
        from: "noReply",
        replyTo: email || undefined,
        subject: isLeadMagnet ? `New Checklist Download: ${email}` : `New Discovery Questionnaire: ${email || 'Anonymous'}`,
        react: isLeadMagnet
          ? React.createElement(NewLeadNotificationEmail, {
              fullName: displayName,
              companyName: "—",
              email: email || "Not provided",
              phone: "—",
              service: "Free Checklist Download",
              requirements: `The visitor requested the free Website Launch Checklist PDF from the /checklist page.`,
              submissionDate: new Date().toISOString(),
            })
          : React.createElement(ChecklistSubmissionEmail, {
            email: email || 'Not provided',
            answers: answers,
            submissionDate: new Date().toISOString()
          }),
      });
      if (!emailResult.success) {
        console.error("[Email Error] Failed to send email:", emailResult.message);
      }
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
