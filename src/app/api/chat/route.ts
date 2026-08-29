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
const GROQ_MODEL = "qwen/qwen3.8-27b";

// --- Request validation -----------------------------------------------------

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(4000),
});

const requestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(30),
});

// --- Static knowledge injected into the system prompt -----------------------

function buildSystemPrompt(): string {
  const packagesSummary = packagesData
    .map((p) => `- ${p.title} (${p.price}): ${p.subtitle}. Best for: ${p.bestFor}`)
    .join("\n");

  const servicesSummary = servicesData
    .map((s: any) => `- ${s.title}: ${s.subtitle}`)
    .join("\n");

  const portfolioSummary = portfolioProjects
    .map((p) => `- ${p.title} (${p.category}): ${p.description}`)
    .join("\n");

  return `You are the support assistant for ${COMPANY.displayName} (${COMPANY.tagline}), a web/software development studio based in ${COMPANY.address}.

Your job: answer visitor questions about services, packages, pricing, and past work accurately and briefly. Be warm but concise — this is a chat widget, not an essay.

COMPANY CONTACT
- Email: ${COMPANY.email}
- Phone/WhatsApp: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}

PACKAGES
${packagesSummary}

SERVICES
${servicesSummary}

PAST WORK / PORTFOLIO
${portfolioSummary}

RULES
1. Only state facts that appear above or that you retrieve via the lookup_lead_status tool. Never invent pricing, timelines, or features not listed.
2. If a visitor asks about the status of a form/lead/demo request they already submitted, ask for the email they used, then call lookup_lead_status with exactly that email. Only report back what that tool returns for that email — never guess.
3. If you don't know something (custom quotes, availability, technical specifics not listed), say so plainly and suggest they contact the team directly via WhatsApp (${COMPANY.phone}) or ${COMPANY.email}, or fill out the contact form at ${COMPANY.websiteUrl}/contact.
4. Never ask for or reveal any data belonging to an email other than the one the current visitor provided.
5. Keep replies short — a few sentences or a short list. No long paragraphs.`;
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
}

// --- Route -------------------------------------------------------------

export async function POST(req: Request) {
  if (!GROQ_API_KEY) {
    return NextResponse.json(
      { success: false, message: "Chat is not configured." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid request", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const conversation = [
      { role: "system", content: buildSystemPrompt() },
      ...parsed.data.messages,
    ];

    // First call — Groq may respond directly, or request a tool call
    let response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: conversation,
        tools,
        tool_choice: "auto",
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("[Grok API Error]", response.status, errText);
      return NextResponse.json(
        { success: false, message: "Chat provider error" },
        { status: 502 }
      );
    }

    let data = await response.json();
    let assistantMessage = data.choices?.[0]?.message;

    // If Grok requested the lookup tool, run it and send the result back
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

      response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: followUpConversation,
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("[Grok API Error - followup]", response.status, errText);
        return NextResponse.json(
          { success: false, message: "Chat provider error" },
          { status: 502 }
        );
      }

      data = await response.json();
      assistantMessage = data.choices?.[0]?.message;
    }

    return NextResponse.json({
      success: true,
      reply: assistantMessage?.content || "Sorry, I couldn't generate a response. Please try again.",
    });
  } catch (error) {
    console.error("[Chat Route Error]", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
