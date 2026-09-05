import { NextResponse } from "next/server";
import { ensureWelcomeEmail } from "@/lib/email/send-welcome";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function isAuthorized(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  // timingSafeEqual throws when lengths differ — compare safely instead.
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");
    const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const expectedToken = process.env.SUPABASE_WEBHOOK_SECRET;
    if (!expectedToken) return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    if (!isAuthorized(token, expectedToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    if (body.type !== "INSERT" || body.table !== "users") {
      return NextResponse.json({ message: "Ignored" });
    }

    const record = body.record;
    if (!record || !record.id || !record.email) {
      return NextResponse.json({ error: "Invalid payload format" }, { status: 400 });
    }

    const result = await ensureWelcomeEmail({
      userId: record.id,
      email: record.email,
      fullName: record.raw_user_meta_data?.full_name || null,
      avatarUrl: record.raw_user_meta_data?.avatar_url || record.raw_user_meta_data?.picture || null,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: result.message });

  } catch (error) {
    console.error("Signup Webhook Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
