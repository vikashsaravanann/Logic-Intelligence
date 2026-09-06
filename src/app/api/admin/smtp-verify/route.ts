import { NextResponse } from "next/server";
import { verifySmtpConnection } from "@/lib/email/smtp";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/admin/smtp-verify
 * Header: x-cron-secret: $CRON_SECRET  (or AGENT_METRICS_SECRET)
 * Confirms Zoho SMTP TLS + authentication from the Vercel runtime.
 */
export async function GET(request: Request) {
  const secret =
    process.env.CRON_SECRET || process.env.AGENT_METRICS_SECRET;
  if (secret) {
    const header = request.headers.get("x-cron-secret");
    if (header !== secret) {
      return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    }
  }

  const result = await verifySmtpConnection("noReply");
  return NextResponse.json(
    {
      ok: result.ok,
      provider: "zoho",
      host: result.host,
      port: result.port,
      secure: result.secure,
      mode: result.secure ? "implicit-tls-465" : "starttls-587",
      error: result.error ?? null,
    },
    { status: result.ok ? 200 : 503 }
  );
}
