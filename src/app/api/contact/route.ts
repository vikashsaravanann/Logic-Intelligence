import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send-email";
import NewLeadNotificationEmail from "@/emails/new-lead-notification-email";
import LeadConfirmationEmail from "@/emails/lead-confirmation-email";
import * as React from "react";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const schema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  projectType: z.string().optional().default("General"),
  budgetRange: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().optional().default(""),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message || "Invalid input",
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      companyName,
      projectType,
      budgetRange,
      timeline,
      description,
    } = parsed.data;

    try {
      const { error: dbError } = await supabaseAdmin.from("contact_leads").insert([
        {
          name: fullName,
          email: email.trim().toLowerCase(),
          company: companyName || null,
          message: [
            description || "",
            phone ? `Phone: ${phone}` : "",
            budgetRange ? `Budget: ${budgetRange}` : "",
            timeline ? `Timeline: ${timeline}` : "",
            projectType ? `Type: ${projectType}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ]);
      if (dbError) console.error("[DB Error] Contact lead insert:", dbError);
    } catch (dbErr) {
      console.error("[DB Error] Contact lead insert exception:", dbErr);
    }

    try {
      const emailResult = await sendEmail({
        to:
          process.env.LEAD_NOTIFICATION_EMAIL ||
          "support@logicintelligencetechnologies.in",
        from: "noReply",
        replyTo: email,
        subject: `New Lead: ${projectType} from ${fullName}`,
        react: React.createElement(NewLeadNotificationEmail, {
          fullName,
          email,
          phone: phone || "N/A",
          companyName: companyName || "N/A",
          service: projectType,
          requirements: `Budget: ${budgetRange || "n/a"} | Timeline: ${timeline || "n/a"}\n\n${description || ""}`,
          submissionDate: new Date().toISOString(),
        }),
      });
      if (!emailResult.success) {
        console.error("[Email Error] Internal notification failed:", emailResult.message);
      }
    } catch (emailErr) {
      console.error("[Email Error] Internal notification exception:", emailErr);
    }

    try {
      const emailResult = await sendEmail({
        to: email,
        from: "hello",
        subject: "We received your request — Logic Intelligence Technologies",
        react: React.createElement(LeadConfirmationEmail, {
          fullName,
          service: projectType,
        }),
      });
      if (!emailResult.success) {
        console.error("[Email Error] User confirmation failed:", emailResult.message);
      }
    } catch (emailErr) {
      console.error("[Email Error] User confirmation exception:", emailErr);
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
