import { NextResponse } from "next/server";
import { COMPANY } from "@/config/company";
import { packagesData } from "@/data/packagesData";
import { servicesData } from "@/data/servicesData";
import { portfolioProjects } from "@/data/portfolioData";
import { logAgentRun } from "@/lib/agent-eval/logger";
import { estimateCostUsd } from "@/lib/agent-eval/cost";
import { estimateFaithfulness } from "@/lib/agent-eval/faithfulness";
import type { FailureClass } from "@/lib/agent-eval/types";

const DEFAULT_GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-oss-120b";

function getAiConfig() {
  const apiKey =
    process.env.GROK_API_KEY || process.env.XAI_API_KEY || process.env.GROQ_API_KEY;
  const apiUrl =
    process.env.GROQ_API_URL || process.env.XAI_API_URL || DEFAULT_GROQ_URL;
  let model = process.env.GROQ_MODEL || process.env.GROK_MODEL || DEFAULT_MODEL;
  if (apiUrl.includes("x.ai")) {
    model = "grok-beta";
  } else if (apiUrl.includes("openrouter.ai")) {
    model = "qwen/qwen-2.5-72b-instruct";
  }
  return { apiKey, apiUrl, model };
}

function getLocalFallbackReply(userText: string): string {
  const lower = (userText || "").toLowerCase();
  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("package") ||
    lower.includes("plan") ||
    lower.includes("pricing") ||
    lower.includes("quote") ||
    lower.includes("launch pack") ||
    lower.includes("pro pack") ||
    lower.includes("enterprise")
  ) {
    return `Here are our popular packages at ${COMPANY.displayName}:\n\n- **Digital Launch Pack (Rs.8,999)**: up to 5 pages, mobile-responsive, basic SEO, contact form, Google Maps, WhatsApp button, 1-month support\n- **Business Pro Pack (Rs.18,999)**: booking system, admin panel, blog, payment gateway, advanced animations, 3-month support\n- **Enterprise Pack (custom from Rs.50,000)**: dedicated project manager, unlimited pages/revisions, 6-month support\n\nFor a custom quote, reach us on WhatsApp at **${COMPANY.phone}** or email **${COMPANY.email}**.`;
  }
  if (
    lower.includes("service") ||
    lower.includes("offer") ||
    lower.includes("build") ||
    lower.includes("develop")
  ) {
    return `At ${COMPANY.displayName}, we build modern web apps, custom software/CRM/ERP, e-commerce, mobile apps, and AI integrations.\n\nTell me what you want to build and I’ll suggest the right package. You can also reach our team on WhatsApp at **${COMPANY.phone}**.`;
  }
  if (
    lower.includes("contact") ||
    lower.includes("phone") ||
    lower.includes("email") ||
    lower.includes("whatsapp") ||
    lower.includes("location") ||
    lower.includes("office")
  ) {
    return `You can reach ${COMPANY.displayName} at:\n\n- **WhatsApp**: ${COMPANY.phone}\n- **Email**: ${COMPANY.email}\n- **Website**: ${COMPANY.websiteUrl}/contact\n\nWe are based in Coimbatore, Tamil Nadu, India.`;
  }
  if (lower.includes("demo") || lower.includes("free")) {
    return `Yes — we offer a **free demo** before you pay. Start at ${COMPANY.websiteUrl}/free-demo or message us on WhatsApp at ${COMPANY.phone}.`;
  }
  return `I'm LOGIC AI from ${COMPANY.displayName}. I can help with packages, services, technical questions, and project scoping.\n\nAsk about pricing, a free demo, or what we build — or reach the team on WhatsApp at **${COMPANY.phone}**.`;
}

function buildSystemPrompt(): string {
  const packagesSummary = packagesData
    .map((p) => `- ${p.title} (${p.price}): ${p.subtitle}`)
    .join("\n");
  const servicesSummary = servicesData
    .map((s: { title: string; subtitle: string }) => `- ${s.title}: ${s.subtitle}`)
    .join("\n");
  const portfolioSummary = portfolioProjects
    .map((p) => `- ${p.title} (${p.category})`)
    .join("\n");

  return `You are LOGIC AI, an incredibly advanced and professional AI assistant created by ${COMPANY.displayName} (${COMPANY.tagline}).

CAPABILITIES:
- You are an expert software engineer and can write production-ready code (Next.js, React, Tailwind, Python, etc.) when the user asks for it. Format code beautifully using Markdown blocks.
- You have vast general knowledge and can answer questions about today's web development news, modern frameworks, and tech trends.
- You have comprehensive knowledge of your creator, ${COMPANY.displayName}, and will help clients understand its services.

COMPANY INFORMATION

PACKAGES & PRICING:
${packagesSummary}

SERVICES:
${servicesSummary}

PORTFOLIO PROJECTS:
${portfolioSummary}

- Website: ${COMPANY.websiteUrl}
- Contact Form: ${COMPANY.websiteUrl}/contact
- Phone / WhatsApp: ${COMPANY.phone}
- Email: ${COMPANY.email}
- Location: Coimbatore, Tamil Nadu, India

GUIDELINES:
1. Always be helpful, confident, and professional.
2. State accurate details based strictly on our company offerings.
3. Keep replies clear, well-structured, and concise (bullet points or 2-3 short paragraphs).
4. If asked about custom quotes, large enterprise projects, or technical consultations, encourage them to connect with our engineers directly on WhatsApp (${COMPANY.phone}) or email (${COMPANY.email}).
5. Maintain a helpful, confident, professional tone like a knowledgeable account manager.
6. For technical questions (coding, AI, DevOps): answer from general knowledge but direct company-specific questions to the team
7. Payment/SOW questions: reference the Statement of Work terms
8. NDA/confidentiality: mutual NDA protects info for 2-3 years
9. Never invent guaranteed rankings, impossible timelines, or prices not listed above.
`;
}

function cleanedContent(rawText: string): string {
  return (rawText || "")
    .replace(/<think>[\s\S]*?<\/think>/gi, "")
    .replace(/<\/?think>/gi, "")
    .trim();
}

function newRunId(): string {
  return `run_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export async function POST(request: Request) {
  const started = Date.now();
  const runId = newRunId();
  let userText = "";
  let modelName: string | null = null;
  let failureClass: FailureClass = "none";
  let usedFallback = false;
  let success = false;
  let reply = "";
  let tokensIn = 0;
  let tokensOut = 0;
  let toolCalls = 0;
  let steps = 1;

  try {
    const body = await request.json();
    const { text, file, max_tokens } = body;
    userText = typeof text === "string" ? text : "";
    const { apiKey, apiUrl, model } = getAiConfig();
    modelName = model;

    let injectedContext = "";
    if (file && file.type === "application/pdf") {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfModule = require("pdf-parse");
        const pdfParse = pdfModule?.default || pdfModule;
        const base64Data = (file.data as string).replace(
          /^data:application\/pdf;base64,/,
          ""
        );
        const buffer = Buffer.from(base64Data, "base64");
        const parsed = await pdfParse(buffer);
        const extractedText = parsed.text?.trim();
        if (extractedText) {
          injectedContext = `\n\nUploaded PDF Content:\n"""\n${extractedText.slice(0, 8000)}\n"""`;
        } else {
          injectedContext = `\n\n[The uploaded PDF appears to be empty or image-only. Please describe what you need help with.]`;
        }
      } catch {
        injectedContext = `\n\n[PDF uploaded but could not be parsed. Please paste the text content directly.]`;
      }
    } else if (file && file.data) {
      injectedContext = `\n\nUploaded File (${file.name || "file"}):\n"""\n${(file.data as string).slice(0, 8000)}\n"""`;
    }

    const systemContent = `
${buildSystemPrompt()}

Verified Company Facts (use these exactly; do not alter numbers or terms):
${injectedContext}`;

    const messages = [
      { role: "system", content: systemContent },
      { role: "user", content: text },
    ];

    if (!apiKey) {
      usedFallback = true;
      failureClass = "dependency";
      reply = getLocalFallbackReply(userText);
      success = Boolean(reply);
      const latency_ms = Date.now() - started;
      await logAgentRun({
        run_id: runId,
        agent_role: "logic-ai",
        success,
        steps,
        tool_calls: 0,
        tokens_in: 0,
        tokens_out: 0,
        latency_ms,
        cost_usd: 0,
        failure_class: failureClass,
        faithfulness: estimateFaithfulness(userText, reply),
        used_fallback: true,
        model: "local-fallback",
        meta: { reason: "missing_api_key" },
      });
      return NextResponse.json({
        success: true,
        generated_text: reply,
        reply,
        run_id: runId,
      });
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.3,
        top_p: 0.9,
        max_tokens: typeof max_tokens === "number" ? max_tokens : 800,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI model error:", response.status, errText);
      usedFallback = true;
      failureClass = response.status >= 500 ? "infra" : "model";
      reply = getLocalFallbackReply(userText);
      success = Boolean(reply);
      await logAgentRun({
        run_id: runId,
        agent_role: "logic-ai",
        success,
        steps,
        tool_calls: 0,
        tokens_in: 0,
        tokens_out: 0,
        latency_ms: Date.now() - started,
        cost_usd: 0,
        failure_class: failureClass,
        faithfulness: estimateFaithfulness(userText, reply),
        used_fallback: true,
        model: modelName,
        meta: { http_status: response.status },
      });
      return NextResponse.json({
        success: true,
        generated_text: reply,
        reply,
        run_id: runId,
      });
    }

    const data = await response.json();
    const usage = data.usage || {};
    tokensIn = Number(usage.prompt_tokens || usage.input_tokens || 0);
    tokensOut = Number(usage.completion_tokens || usage.output_tokens || 0);
    const assistantMessage = data.choices?.[0]?.message;

    if (assistantMessage?.tool_calls?.length) {
      toolCalls = assistantMessage.tool_calls.length;
      steps = 1 + toolCalls;
      success = true;
      await logAgentRun({
        run_id: runId,
        agent_role: "logic-ai",
        success: true,
        steps,
        tool_calls: toolCalls,
        tokens_in: tokensIn,
        tokens_out: tokensOut,
        latency_ms: Date.now() - started,
        cost_usd: estimateCostUsd(tokensIn, tokensOut, modelName),
        failure_class: "none",
        used_fallback: false,
        model: modelName,
        meta: { tool_call_only: true },
      });
      return NextResponse.json({
        success: true,
        tool_calls: assistantMessage.tool_calls,
        generated_text: "",
        reply: "",
        run_id: runId,
      });
    }

    const rawContent =
      assistantMessage?.content || assistantMessage?.reasoning_content || "";
    const cleaned = cleanedContent(rawContent);

    if (cleaned) {
      reply = cleaned;
      success = true;
    } else {
      usedFallback = true;
      failureClass = "model";
      reply = getLocalFallbackReply(userText);
      success = Boolean(reply);
    }

    const latency_ms = Date.now() - started;
    const faithfulness = estimateFaithfulness(userText, reply);
    const escalated =
      /whatsapp|contact form|speak (to|with) (a|our) (human|engineer|team)/i.test(
        reply
      ) && /quote|enterprise|consult/i.test(userText);

    await logAgentRun({
      run_id: runId,
      agent_role: "logic-ai",
      success,
      steps,
      tool_calls: toolCalls,
      tokens_in: tokensIn,
      tokens_out: tokensOut,
      latency_ms,
      cost_usd: estimateCostUsd(tokensIn, tokensOut, modelName),
      failure_class: failureClass,
      faithfulness,
      escalated,
      used_fallback: usedFallback,
      model: modelName,
      meta: {
        has_file: Boolean(file),
      },
    });

    return NextResponse.json({
      success: true,
      generated_text: reply,
      reply,
      run_id: runId,
      metrics: {
        latency_ms,
        tokens_in: tokensIn,
        tokens_out: tokensOut,
        faithfulness,
        used_fallback: usedFallback,
      },
    });
  } catch (error: unknown) {
    console.error("Error connecting to AI:", error);
    usedFallback = true;
    const err = error as { name?: string };
    failureClass =
      err?.name === "TimeoutError" || err?.name === "AbortError"
        ? "timeout"
        : "unknown";
    reply = getLocalFallbackReply(userText);
    success = Boolean(reply);
    await logAgentRun({
      run_id: runId,
      agent_role: "logic-ai",
      success,
      steps: 1,
      tool_calls: 0,
      tokens_in: 0,
      tokens_out: 0,
      latency_ms: Date.now() - started,
      cost_usd: 0,
      failure_class: failureClass,
      faithfulness: estimateFaithfulness(userText, reply),
      used_fallback: true,
      model: modelName,
      meta: {
        error_name: err?.name || "Error",
      },
    });
    return NextResponse.json({
      success: true,
      generated_text: reply,
      reply,
      run_id: runId,
    });
  }
}

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
