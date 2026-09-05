import { NextResponse } from "next/server";
import { ensureWelcomeEmail } from "@/lib/email/send-welcome";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Direct welcome-email trigger called right after sign-up
 * (email/password sign-ups never reliably hit the DB webhook,
 * so the client calls this fire-and-forget on signup success).
 * Idempotent — safe to call multiple times.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { userId, email, fullName } = body as {
      userId?: string;
      email?: string;
      fullName?: string | null;
    };

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await ensureWelcomeEmail({ userId, email, fullName });

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: result.message, alreadySent: result.alreadySent });
  } catch (error) {
    console.error("Send Welcome API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
