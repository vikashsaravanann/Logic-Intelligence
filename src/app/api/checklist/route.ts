import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail } from "@/lib/email/send-email";
import ChecklistSubmissionEmail from "../../../../emails/checklist-submission-email";
import { env } from "@/config/env";
import { z } from "zod";
import * as React from "react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key";
const supabase = createClient(supabaseUrl, supabaseKey);

const schema = z.object({
  email: z.string().email("Invalid email address").optional(),
  answers: z.array(z.string()),
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
    
    const { answers, email } = parsed.data;

    // 1. Insert into Supabase
    if (env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error: dbError } = await supabase
        .from("checklist_leads")
        .insert([
          { 
            name: "Anonymous",
            email: email || "unknown@example.com", 
            company: answers[1] || "",
            role: answers[2] || "",
          }
        ]);
      
      if (dbError) {
        console.error("[DB Error] Failed to insert checklist submission:", dbError);
      }
    }

    // 2. Send Internal Notification Email
    await sendEmail({
      to: env.LEAD_NOTIFICATION_EMAIL,
      subject: `New Client Discovery Checklist: ${email || 'Anonymous'}`,
      react: React.createElement(ChecklistSubmissionEmail, {
        email: email || 'Not provided', 
        answers: answers, 
        submissionDate: new Date().toISOString()
      }),
    });

    return NextResponse.json({ success: true, message: "Checklist received" });
  } catch (error) {
    console.error("Checklist API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
