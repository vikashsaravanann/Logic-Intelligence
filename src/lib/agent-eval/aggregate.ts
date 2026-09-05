import "server-only";
import type { AgentRunAggregate } from "./types";

function percentile(sorted: number[], p: number): number {
  if (!sorted.length) return 0;
  const idx = Math.min(sorted.length - 1, Math.ceil((p / 100) * sorted.length) - 1);
  return sorted[Math.max(0, idx)];
}

/**
 * Aggregate agent_runs for a rolling window (hours).
 */
export async function aggregateAgentRuns(
  windowHours = 24
): Promise<AgentRunAggregate | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;

  const since = new Date(Date.now() - windowHours * 3600_000).toISOString();
  const qs = new URLSearchParams({
    select:
      "success,latency_ms,tokens_in,tokens_out,cost_usd,failure_class,faithfulness,escalated,used_fallback",
    created_at: `gte.${since}`,
    order: "created_at.desc",
    limit: "5000",
  });

  // PostgREST filter syntax
  const endpoint = `${url}/rest/v1/agent_runs?select=success,latency_ms,tokens_in,tokens_out,cost_usd,failure_class,faithfulness,escalated,used_fallback&created_at=gte.${since}&order=created_at.desc&limit=5000`;

  const res = await fetch(endpoint, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    signal: AbortSignal.timeout(8000),
    cache: "no-store",
  });
  if (!res.ok) {
    console.warn("[agent_run] aggregate fetch failed", res.status);
    return null;
  }

  const rows = (await res.json()) as Array<{
    success: boolean;
    latency_ms: number;
    tokens_in: number;
    tokens_out: number;
    cost_usd: number;
    failure_class: string | null;
    faithfulness: number | null;
    escalated: boolean;
    used_fallback: boolean;
  }>;

  void qs;
  const total = rows.length;
  const successes = rows.filter((r) => r.success).length;
  const fallbacks = rows.filter((r) => r.used_fallback).length;
  const escalations = rows.filter((r) => r.escalated).length;
  const latencies = rows.map((r) => r.latency_ms).sort((a, b) => a - b);
  const totalTokens = rows.reduce((s, r) => s + (r.tokens_in || 0) + (r.tokens_out || 0), 0);
  const totalCost = rows.reduce((s, r) => s + Number(r.cost_usd || 0), 0);
  const faithVals = rows
    .map((r) => r.faithfulness)
    .filter((v): v is number => typeof v === "number");
  const by_failure_class: Record<string, number> = {};
  for (const r of rows) {
    const k = r.failure_class || "none";
    by_failure_class[k] = (by_failure_class[k] || 0) + 1;
  }

  return {
    window_hours: windowHours,
    total_runs: total,
    success_rate: total ? successes / total : 0,
    fallback_rate: total ? fallbacks / total : 0,
    escalation_rate: total ? escalations / total : 0,
    avg_latency_ms: total
      ? Math.round(latencies.reduce((a, b) => a + b, 0) / total)
      : 0,
    p95_latency_ms: Math.round(percentile(latencies, 95)),
    total_tokens: totalTokens,
    total_cost_usd: Math.round(totalCost * 1e6) / 1e6,
    cost_per_success: successes ? totalCost / successes : 0,
    avg_faithfulness: faithVals.length
      ? Math.round((faithVals.reduce((a, b) => a + b, 0) / faithVals.length) * 1000) /
        1000
      : null,
    by_failure_class,
  };
}
