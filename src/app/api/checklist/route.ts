import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import ChecklistSubmissionEmail from "@/emails/checklist-submission-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
import ChecklistDownloadEmail from "@/emails/checklist-download-email";
import { env } from "@/config/env";
import { z } from "zod";
import * as React from "react";
import path from "path";
import fs from "fs";


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

        await sendEmail({
          to: email,
          from: "hello",
          subject: isLeadMagnet ? "Your Website Launch Checklist" : "We received your request! (Logic Intelligence Technologies)",
          react: isLeadMagnet 
            ? React.createElement(ChecklistDownloadEmail, { fullName: "there" })
            : React.createElement(LeadConfirmationEmail, {
                fullName: "there",
                service: "Client Discovery Form",
              }),
          attachments: attachments.length > 0 ? attachments : undefined
        });
      } catch (emailErr) {
        console.error("[Email Error] Checklist user confirmation failed:", emailErr);
      }
    }

    // 3. Send Internal Notification Email
    try {
      await sendEmail({
        to: env.LEAD_NOTIFICATION_EMAIL,
        from: "noReply",
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
