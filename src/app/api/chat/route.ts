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

  let prompt = `You are the friendly, professional AI support assistant for ${COMPANY.displayName} (${COMPANY.tagline}), a premier web & software development studio based in ${COMPANY.address}.

Your job: answer visitor questions about our services, packages, pricing, technology stack, and past work accurately, warmly, and concisely.

COMPANY CONTACT DETAILS
- Email: ${COMPANY.email}
- WhatsApp / Phone: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}
- Contact Form: ${COMPANY.websiteUrl}/contact

FOUNDER INFORMATION
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
4. If asked about custom quotes, large enterprise projects, or technical consultations, encourage them to connect with our engineers directly on WhatsApp (${COMPANY.phone}) or email (${COMPANY.email}).`;

  if (leadContext) {
    prompt += `\n\nLEAD SUBMISSION LOOKUP RESULT:\n${leadContext}\n(Use this verified submission data to answer the visitor's status question directly and warmly.)`;
  }

  return prompt;
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
