import { NextResponse } from "next/server";
import { GOLDEN_EVAL_CASES, scoreGoldenReply } from "@/lib/agent-eval/golden";

/**
 * Offline golden-set evaluation against live /api/ai (or local fallback path).
 * POST { baseUrl?: string }
 * Protect with AGENT_METRICS_SECRET when set.
 */
export async function POST(request: Request) {
  const secret = process.env.AGENT_METRICS_SECRET;
  if (secret) {
    const header = request.headers.get("x-agent-metrics-secret");
    if (header !== secret) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
  }

  let baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://127.0.0.1:3000";
  try {
    const body = await request.json().catch(() => ({}));
    if (body?.baseUrl) baseUrl = String(body.baseUrl).replace(/\/$/, "");
  } catch {
    /* empty */
  }

  const origin = new URL(request.url).origin;
  const targetBase = baseUrl.includes("127.0.0.1") ? origin : baseUrl;

  const results: Array<{
    id: string;
    category: string;
    pass: boolean;
    latency_ms: number;
    missing: string[];
    forbidden_hit: string[];
    run_id?: string;
  }> = [];

  for (const testCase of GOLDEN_EVAL_CASES) {
    const t0 = Date.now();
    try {
      const res = await fetch(`${targetBase}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: testCase.prompt }),
        signal: AbortSignal.timeout(35000),
      });
      const data = await res.json();
      const reply = String(data.reply || data.generated_text || "");
      const scored = scoreGoldenReply(testCase, reply);
      results.push({
        id: testCase.id,
        category: testCase.category,
        pass: scored.pass,
        latency_ms: Date.now() - t0,
        missing: scored.missing,
        forbidden_hit: scored.forbidden_hit,
        run_id: data.run_id,
      });
    } catch {
      results.push({
        id: testCase.id,
        category: testCase.category,
        pass: false,
        latency_ms: Date.now() - t0,
        missing: testCase.must_include || [],
        forbidden_hit: [],
      });
    }
  }

  const passed = results.filter((r) => r.pass).length;
  const pass_rate = results.length ? passed / results.length : 0;

  return NextResponse.json({
    success: true,
    pass_rate,
    passed,
    total: results.length,
    gate_ok: pass_rate >= 0.85,
    results,
  });
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
