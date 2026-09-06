import { COMPANY } from "@/config/company";
import { packagesData } from "@/data/packagesData";
import { servicesData } from "@/data/servicesData";
import { portfolioProjects } from "@/data/portfolioData";
import { LEAD_QUALIFICATION_GUIDANCE } from "@/lib/ai/tools";

/** Full fact block synced from src/data/* — keep both AI surfaces aligned. */
export function buildCompanyKnowledgeBlock(): string {
  const packagesSummary = packagesData
    .map((p) => {
      const inclusions = (p.inclusions || [])
        .slice(0, 8)
        .map((i) => i.title)
        .join("; ");
      return `- ${p.title} (${p.price}): ${p.subtitle}. Best for: ${p.bestFor}. Includes: ${inclusions}. Payment: ${(p.paymentTerms || []).join(" / ") || "see package page"}.`;
    })
    .join("\n");

  const servicesSummary = servicesData
    .map((s: { title: string; subtitle?: string; description?: string }) => {
      const desc = (s.description || s.subtitle || "").replace(/\s+/g, " ").slice(0, 220);
      return `- ${s.title}: ${desc}`;
    })
    .join("\n");

  const portfolioSummary = portfolioProjects
    .map((p) => {
      const metrics = (p.metrics || [])
        .map((m) => `${m.label}=${m.value}`)
        .join(", ");
      return `- ${p.title} (${p.category}): ${p.description}${metrics ? ` | Metrics: ${metrics}` : ""}`;
    })
    .join("\n");

  return `VERIFIED COMPANY FACTS (do not invent outside this block):

PACKAGES:
${packagesSummary}

SERVICES:
${servicesSummary}

PORTFOLIO:
${portfolioSummary}

CONTACT:
- Email: ${COMPANY.email}
- WhatsApp / Phone: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}
- Free demo: ${COMPANY.websiteUrl}/free-demo
- Contact form: ${COMPANY.websiteUrl}/contact
- Location: Coimbatore, Tamil Nadu, India
- Founder: ${COMPANY.founder?.name || "Vikash Saravanan"} (${COMPANY.founder?.title || "Founder & CEO"})

PAYMENT & PROCESS (summary):
- Launch & Pro packs: typically 50% advance, 50% on delivery
- Enterprise: milestone-based
- Free demo available before payment when scope fits
- Free support window depends on package (1 / 3 / 6 months)

GENERAL KNOWLEDGE & SCOPE:
- You are a capable general-purpose assistant as well as the company expert for Logic Intelligence Technologies.
- For non-company questions (technology comparisons, definitions, how-tos, current best practices, product comparisons like Netflix vs Amazon Prime Video, coding help, business strategy, etc.), give accurate, balanced, professional answers with clear structure (pros/cons, when to choose what).
- Do not refuse general questions or force every reply back to company sales.
- When a general answer can naturally connect to how LIT helps (e.g. building a streaming-like product, web apps, AI), you may offer a brief optional bridge — never force it.
- Prefer facts you are confident about; if uncertain, say so. Do not invent company prices outside the packages listed above.

${LEAD_QUALIFICATION_GUIDANCE}
`;
}
