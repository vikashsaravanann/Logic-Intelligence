import { NextResponse } from "next/server";
import { aggregateAgentRuns } from "@/lib/agent-eval/aggregate";

/**
 * Aggregate online agent metrics.
 * Protect with AGENT_METRICS_SECRET or admin session in production.
 */
export async function GET(request: Request) {
  const secret = process.env.AGENT_METRICS_SECRET;
  if (secret) {
    const header = request.headers.get("x-agent-metrics-secret");
    if (header !== secret) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
  }

  const { searchParams } = new URL(request.url);
  const hours = Math.min(168, Math.max(1, Number(searchParams.get("hours") || 24)));

  const agg = await aggregateAgentRuns(hours);
  if (!agg) {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to aggregate (missing Supabase service role or table)",
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ success: true, metrics: agg });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
