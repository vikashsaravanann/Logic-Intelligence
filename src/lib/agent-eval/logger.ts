import "server-only";
import type { AgentRunEvent } from "./types";

/**
 * Persist agent run metrics. Never throws to the request path.
 * Prefers Supabase service role; always logs structured JSON for log drains.
 */
export async function logAgentRun(event: AgentRunEvent): Promise<void> {
  const payload = {
    ...event,
    failure_class: event.failure_class ?? (event.success ? "none" : "unknown"),
    escalated: event.escalated ?? false,
    used_fallback: event.used_fallback ?? false,
    meta: event.meta ?? {},
  };

  // Structured log for Vercel / Axiom / Datadog
  console.info(
    JSON.stringify({
      type: "agent_run",
      ...payload,
      ts: new Date().toISOString(),
    })
  );

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  try {
    const res = await fetch(`${url}/rest/v1/agent_runs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        run_id: payload.run_id,
        agent_role: payload.agent_role,
        task_id: payload.task_id ?? null,
        user_id: payload.user_id ?? null,
        success: payload.success,
        steps: payload.steps,
        tool_calls: payload.tool_calls,
        tokens_in: payload.tokens_in,
        tokens_out: payload.tokens_out,
        latency_ms: payload.latency_ms,
        cost_usd: payload.cost_usd,
        failure_class: payload.failure_class,
        faithfulness: payload.faithfulness ?? null,
        escalated: payload.escalated,
        used_fallback: payload.used_fallback,
        model: payload.model ?? null,
        meta: payload.meta,
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) {
      console.warn("[agent_run] persist failed", res.status, await res.text());
    }
  } catch (err) {
    console.warn("[agent_run] persist error", err);
  }
}
