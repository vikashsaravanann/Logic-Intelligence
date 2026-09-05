const pdfParse = require("pdf-parse");
import { NextResponse } from 'next/server';
import { COMPANY } from "@/config/company";
import { packagesData } from "@/data/packagesData";
import { servicesData } from "@/data/servicesData";
import { portfolioProjects } from "@/data/portfolioData";

const GROQ_API_KEY = process.env.GROK_API_KEY || process.env.XAI_API_KEY || process.env.GROQ_API_KEY;
const GROQ_API_URL = process.env.GROQ_API_URL || process.env.XAI_API_URL || "https://api.groq.com/openai/v1/chat/completions";

let GROQ_MODEL = process.env.GROQ_MODEL || process.env.GROK_MODEL || "openai/gpt-oss-120b";
if (GROQ_API_URL.includes("x.ai")) {
    GROQ_MODEL = "grok-beta";
} else if (GROQ_API_URL.includes("openrouter.ai")) {
    GROQ_MODEL = "qwen/qwen-2.5-72b-instruct";
}

function buildSystemPrompt(): string {
  const packagesSummary = packagesData.map((p) => `- ${p.title} (${p.price}): ${p.subtitle}`).join("\n");
  const servicesSummary = servicesData.map((s: any) => `- ${s.title}: ${s.subtitle}`).join("\n");
  const portfolioSummary = portfolioProjects.map((p) => `- ${p.title} (${p.category})`).join("\n");

  return `You are LOGIC AI, an incredibly advanced and professional AI assistant created by ${COMPANY.displayName} (${COMPANY.tagline}).

CAPABILITIES:
- You are an expert software engineer and can write production-ready code (Next.js, React, Tailwind, Python, etc.) when the user asks for it. Format code beautifully using Markdown blocks.
- You have vast general knowledge and can answer questions about today's web development news, modern frameworks, and tech trends.
- You have comprehensive knowledge of your creator, ${COMPANY.displayName}, and will help clients understand its services.

COMPANY INFORMATION
- Name: ${COMPANY.displayName}
- Email: ${COMPANY.email}
- Phone/WhatsApp: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}

COMPANY PACKAGES
${packagesSummary}

COMPANY SERVICES
${servicesSummary}

PAST WORK / PORTFOLIO
${portfolioSummary}

RULES:
1. When asked to write code, provide fully complete, highly professional, and perfectly formatted code.
2. If asked about the company, answer enthusiastically and professionally based strictly on the provided company information.
3. If asked about general knowledge, answer intelligently as a top-tier AI assistant.
4. Maintain a highly professional, enterprise-grade tone.`;
}

export async function POST(request: Request) {
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: "Chat is not configured." }, { status: 503 });
  }

  try {
    const body = await request.json();
    const userMessage = body.text || body.message;
    const maxTokens = body.max_tokens || 2048;
    
    
    const candidateModels = [
      GROQ_MODEL,
      "openai/gpt-oss-120b",
      "openai/gpt-oss-20b",
      "groq/compound-mini",
    ].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

    const file = body.file;
    let injectedContext = "";
    let isVision = false;
    let multimodalMessages: any[] = [];

    let activeModelSupportsVision = GROQ_MODEL.toLowerCase().includes('vision') || GROQ_MODEL.toLowerCase().includes('gpt-4o') || GROQ_MODEL.toLowerCase().includes('claude-3');
    if (GROQ_MODEL === 'grok-beta') activeModelSupportsVision = false;

    if (file) {
      if (file.type === 'application/pdf') {
        try {
          const buffer = Buffer.from(file.data, 'base64');
          const pdfData = await pdfParse(buffer);
          injectedContext = `\n\n--- START OF ATTACHED PDF: ${file.name} ---\n${pdfData.text}\n--- END OF ATTACHED PDF ---`;
        } catch (e) {
          console.error("PDF parse error:", e);
          injectedContext = `\n\n[Error: Failed to extract text from PDF: ${file.name}]`;
        }
      } else if (file.type.startsWith('image/')) {
         if (activeModelSupportsVision) {
           isVision = true;
           multimodalMessages = [
             {
               role: "user",
               content: [
                 { type: "text", text: userMessage },
                 { type: "image_url", image_url: { url: `data:${file.type};base64,${file.data}` } }
               ]
             }
           ];
         } else {
           injectedContext = `\n\n[SYSTEM NOTE: The user has uploaded an image named '${file.name}'. Unfortunately, you are currently using the ${GROQ_MODEL} model, which does not support analyzing images. Please inform the user that you can see the filename but cannot analyze the image content.]`;
         }
      } else {
         let textContent = file.data;
         injectedContext = `\n\n--- START OF ATTACHED FILE: ${file.name} ---\n${textContent}\n--- END OF ATTACHED FILE ---`;
      }
    }

    const messagesPayload = isVision ? 
      [ { role: "system", content: buildSystemPrompt() }, ...multimodalMessages ] :
      [
        { role: "system", content: buildSystemPrompt() },
        { role: "user", content: userMessage + injectedContext }
      ];

    let response: Response | null = null;
    for (const model of candidateModels) {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model,
          messages: messagesPayload,
          max_tokens: maxTokens,
          stream: true,
        }),
      });


      if (res.ok && res.body) {
        response = res;
        break;
      }
      console.warn(`[AI API] Model ${model} returned status ${res.status}`);
    }

    if (!response || !response.ok) {
      throw new Error(`Chat models failed to respond`);
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
