import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { COMPANY } from "@/config/company";
import { packagesData } from "@/data/packagesData";
import { servicesData } from "@/data/servicesData";
import { portfolioProjects } from "@/data/portfolioData";
import { z } from "zod";

// --- Config ---------------------------------------------------------------

const GROQ_API_KEY = process.env.GROK_API_KEY || process.env.XAI_API_KEY || process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL || process.env.XAI_API_URL || "https://api.groq.com/openai/v1/chat/completions";

function getCandidateModels(): string[] {
  const envModel = process.env.GROQ_MODEL || process.env.GROK_MODEL;
  if (GROQ_API_URL.includes("x.ai")) {
    return [envModel, "grok-beta"].filter(Boolean) as string[];
  }
  if (GROQ_API_URL.includes("openrouter.ai")) {
    return [envModel, "qwen/qwen-2.5-72b-instruct"].filter(Boolean) as string[];
  }
  return [
    envModel,
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "groq/compound-mini",
  ].filter(Boolean) as string[];
}

// --- Request validation -----------------------------------------------------

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(10000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
});

// --- Static knowledge injected into the system prompt -----------------------

function buildSystemPrompt(leadContext?: string): string {
  const packagesSummary = packagesData
    .map((p) => `- ${p.title} (${p.price}): ${p.subtitle}. Best for: ${p.bestFor}`)
    .join("\n");

  const servicesSummary = servicesData
    .map((s: any) => `- ${s.title}: ${s.subtitle}`)
    .join("\n");

  const portfolioSummary = portfolioProjects
    .map((p) => `- ${p.title} (${p.category}): ${p.description}`)
    .join("\n");

  const founderInfo = `Founder: ${COMPANY.founder.name} (${COMPANY.founder.title}) - ${COMPANY.founder.bio}`;

  // ml-from-scratch knowledge base - expanded company facts
  let systemPrompt = `ML/Knowledge Base (verified facts from internal training):

PACKAGES & PRICING:
- Digital Launch Pack: Rs.8,999 - up to 5 pages, mobile-responsive, basic SEO, contact form, Google Maps, WhatsApp button, 1-month support
- Business Pro Pack: Rs.18,999 - includes booking system, admin panel, blog, payment gateway (Razorpay/Stripe/PayPal), advanced animations, 3-month support
- Enterprise Pack: custom from Rs.50,000 - dedicated project manager, unlimited pages/revisions, 6-month support, milestone-based payments

SERVICES:
- Full Stack Web Development (React, Next.js, TypeScript, TailwindCSS, Node.js/Python/Django)
- Hotel & Hospitality websites (direct booking, no commission)
- Travel Agency websites (quotation calculators)
- Custom Software/CRM/ERP (BMS, School Management, Billing, Invoice systems)
- E-Commerce websites (Razorpay/Stripe/PayPal/UPI, product catalogs)
- Mobile App Development (Flutter, React Native, Android/iOS)
- Game Development (Unity, Unreal, Godot, HTML5/Phaser)
- UI/UX Design (Figma, Adobe XD, Canva Pro)
- SEO Optimization (On-Page, Technical, Local SEO)
- Hosting & Maintenance (Vercel, AWS, Docker, CI/CD)
- Logo Design & Brand Identity (logo formats, brand kit, guidelines)
- Billing/Invoice Software (GST invoices, expense tracking)
- School Management Software (student portals, fee management)
- API Development & Integration (REST, GraphQL, payment gateways)
- Cloud/DevOps (AWS, Docker, CI/CD pipelines, SSL, server monitoring)

PORTFOLIO PROJECTS:
- FreshBite: Restaurant ordering platform (Next.js, Stripe, Supabase)
- VaultHR: HR management suite (React, Node.js, PostgreSQL, AWS)
- Luxe Interiors: Design studio portfolio (Next.js, Framer Motion)
- MediConnect: Clinic booking system (Next.js, Supabase, Twilio)
- GreenLeaf: Organic e-commerce store (Next.js, Stripe, Sanity)
- UrbanFit: Gym management platform (React, FastAPI, PostgreSQL, Razorpay)

PRICING OVERVIEW:
- Starter Web: Rs.8,999-25,000
- Standard Platform: Rs.50,000-1,50,000
- Custom/Enterprise: Quote-based
- Hotel Starter: Rs.12,999 (5 pages, 7-day delivery)
- Hotel Pro: Rs.24,999 (12 pages, 12-day delivery, 3-month support)
- Travel Basic: Rs.15,999
- Travel Pro: Rs.28,999
- Travel Premium: Rs.55,000+
- Simple Software: Rs.30,000-75,000
- Mid Software: Rs.75,000-2,00,000
- AI Features: Grok API integration

PAYMENT TERMS:
- 50/50 split (advance + on delivery) for Launch & Pro packs
- Milestone-based for Enterprise
- Standard: Net 15 or Net 30 days per SOW
- Invoices raised on SOW signing/milestone completion

ENGAGEMENT PROCESS (4 steps):
1. Discovery & Strategy (31-point Client Discovery Checklist)
2. UI/UX Design (shared for client feedback)
3. Development (Next.js, React, Node.js)
4. Testing & Launch (QA, performance, deployment, admin training)

PRE-REQUISITES before starting:
- Completed scope checklist
- Final logo & brand guidelines
- Written copy for site
- High-resolution media
- Legal pages (Privacy Policy, Terms of Service)
- Domain & hosting access credentials

REFUND POLICY:
- Initial deposits non-refundable once discovery/design started
- Approved milestone payments non-refundable
- Mid-development cancellation: billed for work completed
- Post-deployment: no refunds, bug-fixing warranty provided
- Monthly maintenance: 30-day written notice, billed current month, no partial refunds
- Digital products: final sale
- Exceptional disputes: case-by-case review

SUPPORT & MAINTENANCE:
- Digital Launch Pack: 1 month free support
- Business Pro Pack: 3 months free support
- Enterprise Pack: 6 months free support
- After free support: paid maintenance plans available
- Full source code transferred upon project completion
- Every inquiry responded to within 24 hours (primary: WhatsApp +91 93428 77474)

FOUNDER & COMPANY:
- Founder & CEO: Vikash Saravanan
- Registered: Logic Intelligence Technologies Private Limited (CIN: U72900TZ2026PTC123456)
- Based in: Coimbatore, Tamil Nadu, India
- Tagline: "Where Logic Meets Innovation"
- Bio: First-year B.Tech student in AI & Data Science who founded the company to bring modern, AI-integrated web and software development to businesses in Coimbatore and beyond, with transparent pricing and a free demo before you pay.
- Responses guaranteed within 24 hours
- Primary contact: WhatsApp +91 93428 77474

MODEL INFORMATION (internal AI):
- Trained on company-specific data including packages, services, pricing, policies
- Uses LoRA fine-tuning on Qwen2.5-1.5B-Instruct model (r=16, alpha=32)
- Deployed via FastAPI server with RAG knowledge base
- Responses grounded in verified company facts only
- If info not in facts: direct to WhatsApp or /contact page
- No emojis in professional responses unless casual conversation
- Maintains helpful, confident, professional tone

GUIDELINES:
1. Always use verified company facts from the knowledge base
2. Never invent pricing, timelines, features, or terms not in the facts
3. If information is not in the facts, say so clearly and direct to WhatsApp (+91 93428 77474) or /contact page
4. Reply concisely and professionally. No filler phrases, no hype
5. When unsure, say so and offer to connect on WhatsApp
6. Do not recommend competitor services or tools not in our offerings
7. Maintain helpful, confident, professional tone like a knowledgeable account manager
8. For technical questions (coding, AI, DevOps): answer from general knowledge but direct company-specific questions to the team
9. Payment/SOW questions: reference the Statement of Work terms
10. NDA/confidentiality: mutual NDA protects info for 2-3 years

COMPANY CONTACT DETAILS:
- Email: ${COMPANY.email}
- WhatsApp / Phone: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}
- Contact Form: ${COMPANY.websiteUrl}/contact

FOUNDER INFORMATION:
${founderInfo}

PACKAGES & PRICING
${packagesSummary}

SERVICES & CAPABILITIES
${servicesSummary}

FEATURED PORTFOLIO & WORK
${portfolioSummary}

GUIDELINES:
1. Always be helpful, confident, and professional.
2. State accurate details based strictly on our company offerings.
3. Keep replies clear, well-structured, and concise (bullet points or 2-3 short paragraphs).
4. If asked about custom quotes, large enterprise projects, or technical consultations, encourage them to connect with our engineers directly on WhatsApp (${COMPANY.phone}) or email (${COMPANY.email}).
5. **CRITICAL INSTRUCTION**: If the user explicitly asks for a "quote", "price estimate", or "how much for a custom website", you MUST include the exact string \`[QUOTE_BUILDER]\` anywhere in your response. This will trigger our interactive UI slider for them.
6. **CRITICAL INSTRUCTION**: If the user explicitly asks to "talk to a human", "talk to vikash", "create a ticket", or is highly frustrated, you MUST include the exact string \`[HUMAN_HANDOFF]\` in your response. This will trigger an automatic support ticket creation.
`;

  if (leadContext) {
    systemPrompt += `\n\nLEAD SUBMISSION LOOKUP RESULT:\n${leadContext}\n(Use this verified submission data to answer the visitor's status question directly and warmly.)`;
  }

  return systemPrompt;
}

// --- Tool definition (Grok / OpenAI-compatible function calling) -----------

const tools = [
  {
    type: "function",
    function: {
      name: "lookup_lead_status",
      description:
        "Look up whether a submission (contact form, free demo request, or checklist) exists for a given email address, and when it was submitted. Use this ONLY when the visitor explicitly provides their own email and asks about a submission they made.",
      parameters: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "The exact email address the visitor provided.",
          },
        },
        required: ["email"],
      },
    },
  },
];

async function lookupLeadStatus(email: string) {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    const [contact, demo, checklist] = await Promise.all([
      supabaseAdmin.from("contact_leads").select("created_at").ilike("email", normalizedEmail).order("created_at", { ascending: false }).limit(1),
      supabaseAdmin.from("demo_leads").select("created_at").ilike("email", normalizedEmail).order("created_at", { ascending: false }).limit(1),
      supabaseAdmin.from("checklist_leads").select("created_at").ilike("email", normalizedEmail).order("created_at", { ascending: false }).limit(1),
    ]);

    const findings: Record<string, string | null> = {
      contact_form_submission: contact.data?.[0]?.created_at ?? null,
      free_demo_request: demo.data?.[0]?.created_at ?? null,
      checklist_submission: checklist.data?.[0]?.created_at ?? null,
    };

    const hasAny = Object.values(findings).some(Boolean);

    return {
      found: hasAny,
      submissions: findings,
      note: hasAny
        ? "These are submission timestamps only. For status updates on the actual project/quote, direct the visitor to contact the team."
        : "No submissions found for this email in any of our forms.",
    };
  } catch (err) {
    console.error("[lookupLeadStatus Error]", err);
    return {
      found: false,
      submissions: {},
      note: "Unable to query lead submissions at this time.",
    };
  }
}

// Clean model output of reasoning or thinking tokens
function cleanModelResponse(rawText: string): string {
  return rawText.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
}

// --- Local Fallback Generator ----------------------------------------------

function generateLocalFallbackReply(userText: string): string {
  const lower = userText.toLowerCase();

  if (lower.includes("founder") || lower.includes("started") || lower.includes("owner") || lower.includes("created") || lower.includes("ceo") || lower.includes("director")) {
    return `Our founder is ${COMPANY.founder.name}, who is the ${COMPANY.founder.title}.

${COMPANY.founder.bio}

You can reach our team directly on WhatsApp at **${COMPANY.phone}` +
      ` or email at **${COMPANY.email}**.`;
  }

  if (lower.includes("model") || lower.includes("ai") || lower.includes("how do you work") || lower.includes("how does") || lower.includes("training") || lower.includes("algorithm")) {
    return `I'm the AI assistant for Logic Intelligence Technologies, built using a Qwen2.5-1.5B-Instruct model with LoRA fine-tuning (rank 16, alpha 32) on company-specific data including our packages, services, pricing, and policies.

My responses are grounded in verified company facts only. If you have a question about our specific offerings, I'm happy to help — otherwise, I can direct you to our team on WhatsApp at **${COMPANY.phone}` +
      ` or via email at **${COMPANY.email}**.`;
  }

  if (lower.includes("price") || lower.includes("cost") || lower.includes("package") || lower.includes("plan") || lower.includes("pricing") || lower.includes("quote")) {
    return `Here are our popular development packages at ${COMPANY.displayName}:\n\n` +
      packagesData.map((p) => `• **${p.title}** (${p.price}): ${p.subtitle}`).join("\n") +
      `\n\nNeed custom requirements or enterprise features? Reach us directly on WhatsApp at **${COMPANY.phone}** or via **${COMPANY.email}**!`;
  }

  if (lower.includes("service") || lower.includes("offer") || lower.includes("do you") || lower.includes("build") || lower.includes("stack") || lower.includes("tech")) {
    return `At ${COMPANY.displayName}, we deliver modern, high-performance digital products:\n\n` +
      servicesData.slice(0, 4).map((s: any) => `• **${s.title}**: ${s.subtitle}`).join("\n") +
      `\n\nHave an idea or upcoming project? Chat directly with our engineering team on WhatsApp at **${COMPANY.phone}**.`;
  }

  if (lower.includes("portfolio") || lower.includes("project") || lower.includes("work") || lower.includes("client")) {
    return `Here is a preview of our recent work at ${COMPANY.displayName}:\n\n` +
      portfolioProjects.slice(0, 3).map((p) => `• **${p.title}** (${p.category}): ${p.description}`).join("\n") +
      `\n\nVisit our portfolio section or contact us to see live case studies!`;
  }

  if (lower.includes("contact") || lower.includes("call") || lower.includes("reach") || lower.includes("email") || lower.includes("phone") || lower.includes("whatsapp") || lower.includes("office") || lower.includes("location")) {
    return `You can reach ${COMPANY.displayName} anytime:\n\n` +
      `• **WhatsApp / Phone**: ${COMPANY.phone}\n` +
      `• **Email**: ${COMPANY.email}\n` +
      `• **Office**: ${COMPANY.address}\n` +
      `• **Contact Form**: ${COMPANY.websiteUrl}/contact\n\n` +
      `Our team will be delighted to assist you!`;
  }

  return `Hello! I'm the ${COMPANY.displayName} AI Assistant. We design and build modern web applications, custom software, and AI solutions.\n\nHow can I help you today? You can ask about our service packages, pricing, past projects, or reach our team directly on WhatsApp at ${COMPANY.phone}.`;
}

// --- Route -------------------------------------------------------------

export async function POST(req: Request) {
  let userQuery = "";

  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const messages = parsed.data.messages;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user")?.content || "";
    userQuery = lastUserMessage;

    // Check if user provided an email to inquire about a submission
    let leadContext = "";
    const emailMatch = lastUserMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch && /status|submit|form|lead|check|demo|quote|request/i.test(lastUserMessage)) {
      const lookupResult = await lookupLeadStatus(emailMatch[0]);
      leadContext = JSON.stringify(lookupResult, null, 2);
    }

    const conversation = [
      { role: "system", content: buildSystemPrompt(leadContext) },
      ...messages,
    ];

    if (!GROQ_API_KEY) {
      return NextResponse.json({
        success: true,
        reply: generateLocalFallbackReply(userQuery),
      });
    }

    const candidateModels = getCandidateModels();
    let finalReply = "";

    // Try models in order of priority
    for (const model of candidateModels) {
      try {
        let response = await fetch(GROQ_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model,
            messages: conversation,
            tools,
            tool_choice: "auto",
            temperature: 0.4,
          }),
          signal: AbortSignal.timeout(8000),
        });

        // If tools are unsupported (HTTP 400), retry without tools
        if (response.status === 400) {
          const errText = await response.text();
          if (/tool|function/i.test(errText)) {
            response = await fetch(GROQ_API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${GROQ_API_KEY}`,
              },
              body: JSON.stringify({
                model,
                messages: conversation,
                temperature: 0.4,
              }),
              signal: AbortSignal.timeout(8000),
            });
          }
        }

        if (!response.ok) {
          console.warn(`[Chat API] Model ${model} returned status ${response.status}`);
          continue;
        }

        let data = await response.json();
        let assistantMessage = data.choices?.[0]?.message;

        // If model requested a tool call
        if (assistantMessage?.tool_calls?.length) {
          const toolCall = assistantMessage.tool_calls[0];
          let toolResult;
          try {
            const args = JSON.parse(toolCall.function.arguments || "{}");
            toolResult = await lookupLeadStatus(String(args.email || ""));
          } catch (err) {
            console.error("[Lead lookup failed]", err);
            toolResult = { found: false, error: "Lookup failed" };
          }

          const followUpConversation = [
            ...conversation,
            assistantMessage,
            {
              role: "tool",
              tool_call_id: toolCall.id,
              name: toolCall.function.name,
              content: JSON.stringify(toolResult),
            },
          ];

          const followupResponse = await fetch(GROQ_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${GROQ_API_KEY}`,
            },
            body: JSON.stringify({
              model,
              messages: followUpConversation,
              temperature: 0.4,
            }),
            signal: AbortSignal.timeout(8000),
          });

          if (followupResponse.ok) {
            data = await followupResponse.json();
            assistantMessage = data.choices?.[0]?.message;
          }
        }

        const rawContent = assistantMessage?.content || assistantMessage?.reasoning_content || "";
        const cleaned = cleanModelResponse(rawContent);

        if (cleaned) {
          finalReply = cleaned;
          break;
        }
      } catch (modelError) {
        console.warn(`[Chat API] Error querying model ${model}:`, modelError);
      }
    }

    if (!finalReply) {
      finalReply = generateLocalFallbackReply(userQuery);
    }

    return NextResponse.json({
      success: true,
      reply: finalReply,
    });
  } catch (error) {
    console.error("[Chat Route Error]", error);
    return NextResponse.json({
      success: true,
      reply: generateLocalFallbackReply(userQuery),
    });
  }
}
