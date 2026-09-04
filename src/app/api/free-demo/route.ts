import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
import NewLeadNotificationEmail from "@/emails/new-lead-notification-email";
import { env } from "@/config/env";
import { z } from "zod";
import * as React from "react";


const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  business: z.string().optional(),
  service_type: z.string().optional().default("General Enquiry"),
  budget: z.string().optional(),
  requirements: z.string().optional(),
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
    
    const { name, email, phone, business, service_type, budget, requirements } = parsed.data;

    // 1. Insert lead into Supabase first (Business logic prioritized)
    if (env.NEXT_PUBLIC_SUPABASE_URL) {
      try {
        const { error: dbError } = await supabaseAdmin
          .from("demo_leads")
          .insert([
            { 
              first_name: name.split(' ')[0] || name, 
              last_name: name.split(' ').slice(1).join(' ') || '', 
              email, 
              phone: phone || '', 
              company_name: business || '', 
              job_title: '', 
              interests: [service_type],
              budget: budget || '',
            }
          ]);
        
        if (dbError) {
          console.error("[DB Error] Failed to insert lead:", dbError);
        }
      } catch (dbErr) {
        console.error("[DB Error] Demo lead insert exception:", dbErr);
      }
    }

    // 2. Send confirmation to User (don't let internal notification failure block this)
    try {
      await sendEmail({
        to: email,
        from: "hello",
        replyTo: "hello@logicintelligencetechnologies.in",
        subject: "We received your request. (Logic Intelligence Technologies)",
        react: React.createElement(LeadConfirmationEmail, { fullName: name, service: service_type }),
      });
    } catch (emailErr) {
      console.error("[Email Error] User confirmation failed:", emailErr);
    }
    
    // 3. Send notification to Internal Team
    try {
      await sendEmail({
        to: ["contact@logicintelligencetechnologies.in", "vikash@logicintelligencetechnologies.in"],
        from: "noReply",
        replyTo: "contact@logicintelligencetechnologies.in",
        subject: `New website enquiry: ${name} — ${service_type}`,
        react: React.createElement(NewLeadNotificationEmail, {
          fullName: name, 
          companyName: business || '', 
          email: email, 
          phone: phone || '', 
          service: service_type, 
          requirements: requirements || '', 
          submissionDate: new Date().toISOString()
        }),
      });
    } catch (emailErr) {
      console.error("[Email Error] Internal notification failed:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Request received" });
  } catch (error) {
    console.error("Free Demo API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
