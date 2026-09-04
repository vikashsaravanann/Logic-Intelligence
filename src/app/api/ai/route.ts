import { NextResponse } from 'next/server';
import { COMPANY } from "@/config/company";
import { packagesData } from "@/data/packagesData";
import { servicesData } from "@/data/servicesData";
import { portfolioProjects } from "@/data/portfolioData";

const GROQ_API_KEY = process.env.GROK_API_KEY || process.env.XAI_API_KEY || process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL || process.env.XAI_API_URL || "https://api.groq.com/openai/v1/chat/completions";

let GROQ_MODEL = "llama-3.3-70b-versatile";
if (GROQ_API_URL.includes("x.ai")) {
    GROQ_MODEL = "grok-beta";
} else if (GROQ_API_URL.includes("openrouter.ai")) {
    GROQ_MODEL = "qwen/qwen-2.5-72b-instruct";
}

function buildSystemPrompt(): string {
  const packagesSummary = packagesData.map((p) => `- ${p.title} (${p.price}): ${p.subtitle}`).join("\n");
  const servicesSummary = servicesData.map((s: any) => `- ${s.title}: ${s.subtitle}`).join("\n");
  const portfolioSummary = portfolioProjects.map((p) => `- ${p.title} (${p.category})`).join("\n");

  return `You are the support assistant for ${COMPANY.displayName}.
COMPANY CONTACT
- Email: ${COMPANY.email}
- Phone/WhatsApp: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}

PACKAGES
${packagesSummary}

SERVICES
${servicesSummary}

PAST WORK
${portfolioSummary}

RULES
1. Only state facts that appear above. Never invent pricing, timelines, or features not listed.
2. If you don't know something, say so plainly and suggest they contact the team.
3. Keep replies helpful and professional. You are talking to enterprise clients.`;
}

export async function POST(request: Request) {
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: "Chat is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const userMessage = body.text || body.message;
    const maxTokens = body.max_tokens || 1024;
    
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          { role: "user", content: userMessage }
        ],
        max_tokens: maxTokens,
        stream: true,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }
    if (!response.body) {
      throw new Error('No response body from backend');
    }

    let buffer = '';
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        buffer += new TextDecoder().decode(chunk, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                const newPayload = `data: ${JSON.stringify({ token: content })}\n\n`;
                controller.enqueue(new TextEncoder().encode(newPayload));
              }
            } catch (e) {
              // Ignore incomplete JSON
            }
          } else if (line === 'data: [DONE]') {
            controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
          }
        }
      },
      flush(controller) {
        if (buffer.startsWith('data: ') && buffer !== 'data: [DONE]') {
          try {
             const data = JSON.parse(buffer.slice(6));
             const content = data.choices?.[0]?.delta?.content;
             if (content) {
                const newPayload = `data: ${JSON.stringify({ token: content })}\n\n`;
                controller.enqueue(new TextEncoder().encode(newPayload));
             }
          } catch(e) {}
        }
      }
    });

    const stream = response.body.pipeThrough(transformStream);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('Error connecting to AI:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI backend', details: error.message },
      { status: 500 }
    );
  }
}
