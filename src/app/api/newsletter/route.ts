import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { z } from "zod";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.issues[0]?.message || "Invalid email." },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert({ email }, { onConflict: "email" });

    if (error) {
      console.error("[Newsletter] primary insert failed, falling back:", error);
      const fallback = await supabaseAdmin.from("contact_leads").insert({
        name: "Newsletter subscriber",
        email,
        company: "Newsletter",
        message: "Footer newsletter subscription",
      });
      if (fallback.error) {
        console.error("[Newsletter] fallback insert failed:", fallback.error);
        return NextResponse.json(
          { success: false, message: "Unable to subscribe right now. Please try again." },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true, message: "Subscribed" });
  } catch (error) {
    console.error("[Newsletter] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
