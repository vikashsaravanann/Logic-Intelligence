import { COMPANY } from "@/config/company";

/**
 * Lightweight reference-free groundedness heuristic for company facts.
 * Not a full Ragas substitute — used as an online signal; offline suite should use LLM-as-judge.
 */
export function estimateFaithfulness(
  userText: string,
  reply: string
): number | null {
  const q = (userText || "").toLowerCase();
  const a = (reply || "").toLowerCase();
  if (!a.trim()) return 0;

  const pricingIntent =
    /price|cost|package|plan|pricing|quote|rs\.?|₹|launch pack|pro pack|enterprise/.test(
      q
    );
  const contactIntent =
    /contact|phone|email|whatsapp|location|office|address|reach/.test(q);

  if (!pricingIntent && !contactIntent) {
    // Neutral: no claim-check applicable
    return null;
  }

  let score = 0.5;
  const checks: boolean[] = [];

  if (pricingIntent) {
    checks.push(/8,?999|18999|18,?999|50,?000/.test(a));
    checks.push(/digital launch|business pro|enterprise/.test(a));
  }
  if (contactIntent) {
    const phoneDigits = COMPANY.phone?.replace(/\D/g, "") || "";
    checks.push(
      a.includes("whatsapp") ||
        a.includes(COMPANY.email?.toLowerCase() || "x") ||
        (phoneDigits.length > 6 && a.replace(/\D/g, "").includes(phoneDigits.slice(-10)))
    );
  }

  if (checks.length) {
    const pass = checks.filter(Boolean).length;
    score = pass / checks.length;
  }

  // Penalize obvious fabrication markers
  if (/guaranteed ranking|100% seo|free forever enterprise/i.test(reply)) {
    score = Math.min(score, 0.2);
  }

  return Math.round(score * 1000) / 1000;
}
