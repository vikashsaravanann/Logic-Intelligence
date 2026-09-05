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
- GreenLeaf: Organic e-commerce store (Next.js, Stripe, Sanity Vercel)
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
2. UI/UX Design (shared with client for feedback)
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
- Mid-development cancellation: billed for work completed to that date
- After final deployment and source code handover, no refunds are issued - a bug-fixing warranty period is provided post-launch
- Monthly maintenance/retainer: cancel with 30 days written notice; billed for current month; no partial month refunds
- Digital products are final sale
- Exceptional disputes reviewed case-by-case. Contact: contact@logicintelligencetechnologies.in.

SUPPORT & MAINTENANCE:
- Digital Launch Pack: 1 month free support
- Business Pro Pack: 3 months free support
- Enterprise Pack: 6 months free support
- After free support: paid maintenance plans available
- Full source code transferred to client upon project completion
- Every inquiry responded to within 24 hours (primary: WhatsApp +91 93428 77474)

FOUNDER & COMPANY:
- Founder & CEO: Vikash Saravanan
- Registered: Logic Intelligence Technologies Private Limited (CIN: U72900TZ2026PTC123456)
- Based in: Coimbatore, Tamil Nadu, India
- Tagline: "Where Logic Meets Innovation"
- Bio: First-year B.Tech student in AI & Data Science who founded the company to bring modern, AI-integrated web and software development to businesses in Coimbatore and beyond, with transparent pricing and a free demo before you pay.
- Responses guaranteed within 24 hours
- Primary contact: WhatsApp +91 93428 77474

COMPANY CONTACT DETAILS:
- Email: ${COMPANY.email}
- WhatsApp / Phone: ${COMPANY.phone}
- Website: ${COMPANY.websiteUrl}
- Contact Form: ${COMPANY.websiteUrl}/contact

GUIDELINES:
1. Always be helpful, confident, and professional.
2. State accurate details based strictly on our company offerings.
3. Keep replies clear, well-structured, and concise (bullet points or 2-3 short paragraphs).
4. If asked about custom quotes, large enterprise projects, or technical consultations, encourage them to connect with our engineers directly on WhatsApp (${COMPANY.phone}) or email (${COMPANY.email}).
5. Maintain a helpful, confident, professional tone like a knowledgeable account manager.
6. For technical questions (coding, AI, DevOps): answer from general knowledge but direct company-specific questions to the team
7. Payment/SOW questions: reference the Statement of Work terms
8. NDA/confidentiality: mutual NDA protects info for 2-3 years
`;
}

export async function POST(request: Request) {
  try {
    const { text, file } = await request.json();

    let injectedContext = "";
    if (file && file.type === 'application/pdf') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const pdfParse = require('pdf-parse');
        const base64Data = (file.data as string).replace(/^data:application\/pdf;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
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
      injectedContext = `\n\nUploaded File (${file.name || 'file'}):\n"""\n${(file.data as string).slice(0, 8000)}\n"""`;
    }

    const rag_context = injectedContext;

    const systemContent = `
${buildSystemPrompt()}

Verified Company Facts (use these exactly; do not alter numbers or terms):
${rag_context}`;

    const messages = [
      {"role": "system", "content": systemContent},
      {"role": "user", "content": text}
    ];

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: messages,
        temperature: 0.3,
        top_p: 0.9,
        do_sample: true,
        pad_token_id: 100266,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { error: "AI model error", details: errText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message;

    if (assistantMessage?.tool_calls?.length) {
      return NextResponse.json({
        success: true,
        tool_calls: assistantMessage.tool_calls,
      });
    }

    const rawContent = assistantMessage?.content || assistantMessage?.reasoning_content || "";
    const cleaned = cleanedContent(rawContent);

    if (cleaned) {
      return NextResponse.json({
        success: true,
        generated_text: cleaned,
      });
    }

    return NextResponse.json({
      success: true,
      generated_text: "I'm unable to generate a response at this time. Please try again.",
    });
  } catch (error: any) {
    console.error('Error connecting to AI:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI backend', details: error.message },
      { status: 500 }
    );
  }
}

function cleanedContent(rawText: string): string {
  return rawText.replace('<\\/think>', '').split('</think>')[0].trim();
}

export const config = {
  runtime: "nodejs",
};
