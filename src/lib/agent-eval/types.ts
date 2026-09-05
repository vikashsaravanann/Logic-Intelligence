/**
 * Structured agent evaluation event — online + offline metrics.
 * Aligns with master-orchestrator references/agent-evaluation.md
 */
export type FailureClass =
  | "none"
  | "contract"
  | "dependency"
  | "validation"
  | "model"
  | "infra"
  | "human-gate"
  | "timeout"
  | "unknown";

export interface AgentRunEvent {
  run_id: string;
  agent_role: string;
  task_id?: string | null;
  user_id?: string | null;
  success: boolean;
  steps: number;
  tool_calls: number;
  tokens_in: number;
  tokens_out: number;
  latency_ms: number;
  cost_usd: number;
  failure_class?: FailureClass | string | null;
  faithfulness?: number | null;
  escalated?: boolean;
  used_fallback?: boolean;
  model?: string | null;
  meta?: Record<string, unknown>;
}

export interface AgentRunAggregate {
  window_hours: number;
  total_runs: number;
  success_rate: number;
  fallback_rate: number;
  escalation_rate: number;
  avg_latency_ms: number;
  p95_latency_ms: number;
  total_tokens: number;
  total_cost_usd: number;
  cost_per_success: number;
  avg_faithfulness: number | null;
  by_failure_class: Record<string, number>;
}

export interface GoldenEvalCase {
  id: string;
  prompt: string;
  must_include?: string[];
  must_not_include?: string[];
  category: "pricing" | "contact" | "services" | "rag" | "safety" | "general";
}
