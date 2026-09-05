/** Rough USD cost from token counts. Override via env for real provider pricing. */
export function estimateCostUsd(
  tokensIn: number,
  tokensOut: number,
  model?: string | null
): number {
  const inPerM = Number(process.env.AI_COST_INPUT_PER_MTOK ?? "0.15");
  const outPerM = Number(process.env.AI_COST_OUTPUT_PER_MTOK ?? "0.60");
  // Optional model-specific overrides later
  void model;
  return (tokensIn / 1_000_000) * inPerM + (tokensOut / 1_000_000) * outPerM;
}
