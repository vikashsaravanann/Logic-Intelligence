import os
import json
import asyncio
import torch
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer, TextIteratorStreamer
from peft import PeftModel
from threading import Thread

app = FastAPI(title="Logic Intelligence Technologies AI Core")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- 1. EXPANDED RAG KNOWLEDGE BASE (verified facts) ---
KNOWLEDGE_BASE = [
    {
        "keywords": ["business pro", "18999", "18,999", "booking", "payment gateway", "admin panel"],
        "context": "Fact: Business Pro Pack is priced from ₹18,999. Inclusions: everything in the Digital Launch Pack plus a booking system, admin panel, blog, payment gateway integration (Razorpay/Stripe/PayPal), and advanced animations. Best for hotels, travel agencies, restaurants, and growing businesses."
    },
    {
        "keywords": ["digital launch", "8999", "8,999", "entry level", "starter", "basic", "cheapest"],
        "context": "Fact: Digital Launch Pack is priced from ₹8,999. Inclusions: up to 5 pages, mobile-responsive design, basic SEO, contact form, Google Maps integration, and a WhatsApp button. Best for small local businesses, freelancers, and first-time online stores."
    },
    {
        "keywords": ["enterprise", "custom software", "large scale", "saas", "50000", "50,000"],
        "context": "Fact: Enterprise Pack is custom-priced starting from ₹50,000. Inclusions: dedicated project manager, custom backend and databases, unlimited pages and revisions, and 6 months of support. Best for large enterprises, custom SaaS/software builds, and funded startups."
    },
    {
        "keywords": ["services", "capabilities", "tech stack", "what do you do", "offer", "technologies"],
        "context": "Fact: Logic Intelligence Technologies, founded by Vikash Saravanan, offers Full Stack Web Development, Hotel & Hospitality Websites, Travel Agency Websites, Custom Software/CRM/ERP, E-Commerce Websites, Mobile App Development, Game Development, UI/UX Design, SEO Optimization, and Hosting & Maintenance. Tech stack: Next.js 16, React 19, TypeScript, TailwindCSS, Supabase (PostgreSQL/Auth/Storage), hosted on Vercel."
    },
    {
        "keywords": ["support", "maintenance", "contact", "help", "whatsapp", "response time"],
        "context": "Fact: Every inquiry is responded to within 24 hours. The primary communication channel is WhatsApp (+91 93428 77474). Once a project is paid in full, the client owns the domain, hosting, and complete source code with no exceptions."
    },
    {
        "keywords": ["guarantee", "promise", "demo", "prototype", "before i pay"],
        "context": "Fact: Every engagement starts with a free demo prototype before the client commits to a contract or pays anything. If the client doesn't love the direction, they can walk away with no obligation."
    },
    {
        "keywords": ["engagement process", "workflow", "how does it work", "steps", "how do you work"],
        "context": "Fact: The engagement follows a 4-step workflow: Discovery & Strategy (31-point Client Discovery Checklist), UI/UX Design (user-centric interfaces for feedback), Development (Next.js, React, Node.js build), and Testing & Launch (QA, performance audits, deployment, admin training)."
    },
    {
        "keywords": ["what do i need to provide", "before starting", "client requirements", "what should i prepare"],
        "context": "Fact: Before starting, clients must provide a completed scope checklist, final logo and brand guidelines, written copy, high-resolution media, legal pages (Privacy/Terms), and access credentials for domains/hosting."
    },
    {
        "keywords": ["payment terms", "invoice", "net 15", "net 30", "milestones"],
        "context": "Fact: Payment terms follow the Statement of Work (SOW). Invoices are raised on SOW signing and/or milestone completion. Standard terms are Net 15 or Net 30 days."
    },
    {
        "keywords": ["nda", "confidentiality", "non-disclosure"],
        "context": "Fact: The Mutual NDA protects confidential information (business plans, code, designs, pricing) for 2-3 years from signing. Shared information can only be used for evaluating the business relationship."
    },
    {
        "keywords": ["working hours", "leave policy", "employee handbook", "office hours"],
        "context": "Fact: Standard working hours are 9:30 AM to 6:30 PM with remote/hybrid options. The company provides Casual, Sick, Privilege/Earned, and Maternity/Paternity leave per statutory provisions."
    },
    {
        "keywords": ["cin", "registration", "legal entity", "company registration number"],
        "context": "Fact: Logic Intelligence Technologies Private Limited is registered with CIN U72900TZ2026PTC123456, based in Coimbatore, Tamil Nadu, India."
    },
    {
        "keywords": ["founder", "ceo", "who started", "who owns"],
        "context": "Fact: Logic Intelligence Technologies was founded by Vikash Saravanan, who serves as Founder and CEO."
    },
    {
        "keywords": ["tagline", "motto", "slogan"],
        "context": "Fact: The company tagline is 'Where Logic Meets Innovation — We Build What Others Imagine.'"
    },
    {
        "keywords": ["e-commerce", "online store", "shopping website", "inventory"],
        "context": "Fact: Logic Intelligence Technologies builds e-commerce websites with inventory dashboards and payment gateway integration (Razorpay, Stripe, PayPal)."
    },
    {
        "keywords": ["hr documents", "offer letter", "employment agreement", "payroll"],
        "context": "Fact: HR documentation includes an Employee Handbook, standard Offer Letters and Employment Agreements, NDA/IP Assignment agreements, and payroll documentation including payroll registers, salary slips, and ESOP grant letters."
    }
]

import subprocess
import re
from duckduckgo_search import DDGS
import chromadb

# Initialize Vector Database
try:
    print("Initializing ChromaDB Vector Database...")
    chroma_client = chromadb.Client()
    collection = chroma_client.create_collection(name="company_knowledge")
    
    # Add company knowledge to Vector DB
    documents = [item["context"] for item in KNOWLEDGE_BASE]
    ids = [str(i) for i in range(len(KNOWLEDGE_BASE))]
    collection.add(documents=documents, ids=ids)
    print(f"Successfully loaded {len(documents)} documents into Vector DB.")
except Exception as e:
    print("Failed to initialize ChromaDB:", e)
    collection = None

def retrieve_web_search(user_query: str) -> str:
    # Trigger if user explicitly says "search" or "look up" (except chembl stuff handled below)
    if "search the web" in user_query.lower() or "search internet" in user_query.lower() or "news" in user_query.lower():
        try:
            print(f"Triggering Web Search for: {user_query}")
            search_query = user_query.lower().replace("search the web for", "").replace("search internet for", "").strip()
            if not search_query:
                search_query = user_query
            
            results = DDGS().text(search_query, max_results=3)
            if results:
                web_facts = "\n".join([f"- {r['title']}: {r['body']}" for r in results])
                return f"Live Web Search Results:\n{web_facts}"
        except Exception as e:
            print("Web search error:", e)
    return ""

def retrieve_chembl_context(user_query: str) -> str:
    # Look for "chembl for X" or "molecule X" or "drug X"
    match = re.search(r'(chembl for|molecule|drug)\s+([a-zA-Z0-9_-]+)', user_query.lower())
    if not match:
        return ""
    
    search_term = match.group(2)
    print(f"Detected ChEMBL lookup for: {search_term}")
    
    try:
        script_path = "/Users/vikash/.gemini/config/plugins/science/skills/chembl_database/scripts/chembl_api.py"
        if not os.path.exists(script_path):
            return ""
            
        output_file = f"/tmp/chembl_search_{search_term}.json"
        
        subprocess.run([
            "uv", "run", script_path, "molecule", 
            "--search", search_term, 
            "--limit", "1", 
            "--output", output_file
        ], capture_output=True, text=True)
        
        if os.path.exists(output_file):
            import json
            import os
            with open(output_file, 'r') as f:
                data = json.load(f)
            
            if data and "molecules" in data and len(data["molecules"]) > 0:
                mol = data["molecules"][0]
                pref_name = mol.get("pref_name", "Unknown")
                chembl_id = mol.get("molecule_chembl_id", "Unknown")
                max_phase = mol.get("max_phase", "Unknown")
                props = mol.get("molecule_properties", {})
                formula = props.get("full_mwt", "Unknown") if props else "Unknown"
                
                context = (f"ChEMBL Database Fact: {search_term.capitalize()} matches {pref_name} "
                           f"(ID: {chembl_id}). Max clinical phase: {max_phase}. "
                           f"Molecular Weight: {formula}.")
                return context
    except Exception as e:
        print("ChEMBL lookup error:", e)
    return ""

def retrieve_rag_context(user_query: str) -> str:
    matched = []
    
    # Use Vector DB if available
    if collection is not None:
        try:
            results = collection.query(query_texts=[user_query], n_results=2)
            if results and results['documents'] and len(results['documents'][0]) > 0:
                matched.extend(results['documents'][0])
        except Exception as e:
            print("Vector DB search error:", e)
    else:
        # Fallback to simple keyword search
        query_lower = user_query.lower()
        fallback = [item["context"] for item in KNOWLEDGE_BASE if any(k in query_lower for k in item["keywords"])]
        matched.extend(fallback)
    
    # 1. Fetch from ChEMBL
    chembl_context = retrieve_chembl_context(user_query)
    if chembl_context:
        matched.append(chembl_context)
        
    # 2. Fetch from Web Search
    web_context = retrieve_web_search(user_query)
    if web_context:
        matched.append(web_context)
        
    return "\n".join(matched) if matched else ""

# --- 2. LOAD MODEL ---
BASE_MODEL_NAME = "Qwen/Qwen2.5-1.5B-Instruct"
ADAPTER_PATHS = [
    "./models/logic-intelligence-lora-v2-final",
    "./models/logic-intelligence-lora-final",
    "./logic-intelligence-lora-v2-final",
    "./logic-intelligence-lora-final",
]

device = "mps" if torch.backends.mps.is_available() else "cpu"
print(f"Using device acceleration: {device}")

print("Loading tokenizer and base model...")
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL_NAME)

base_model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL_NAME,
    torch_dtype=torch.float16 if device == "mps" else torch.float32,
    low_cpu_mem_usage=True
)

adapter_loaded = False
loaded_adapter_path = None
for path in ADAPTER_PATHS:
    if os.path.exists(path):
        print(f"Applying LoRA adapter from '{path}'...")
        peft_model = PeftModel.from_pretrained(base_model, path)
        print("Merging adapter into base model for high-speed inference...")
        model = peft_model.merge_and_unload()
        adapter_loaded = True
        loaded_adapter_path = path
        break

if not adapter_loaded:
    print("Warning: No adapter folder found. Running base instruction model.")
    model = base_model

model.to(device)
model.eval()

# --- 3. REQUEST MODELS ---
class PromptRequest(BaseModel):
    text: str
    max_tokens: int = 250

def build_messages(user_text: str):
    rag_context = retrieve_rag_context(user_text)
    system_content = (
        "You are the AI assistant for Logic Intelligence Technologies, "
        "a full-stack web, app, and software development company founded by Vikash Saravanan. "
        "Provide accurate, professional, and concise responses. Only state facts you are confident about; "
        "if unsure about a specific number or detail, say so rather than guessing."
    )
    if rag_context:
        system_content += f"\n\nVerified Company Facts (use these exactly, do not alter numbers):\n{rag_context}"
    return [
        {"role": "system", "content": system_content},
        {"role": "user", "content": user_text}
    ]

# --- 4. ENDPOINTS ---
@app.get("/health")
async def health_check():
    return {"status": "ok", "adapter_loaded": adapter_loaded, "adapter_path": loaded_adapter_path, "device": device}

@app.post("/generate")
async def generate_text(request: PromptRequest):
    """Non-streaming endpoint (kept for compatibility)."""
    try:
        messages = build_messages(request.text)
        inputs = tokenizer.apply_chat_template(
            messages, return_tensors="pt", add_generation_prompt=True, return_dict=True
        ).to(device)

        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=request.max_tokens,
                temperature=0.3,
                top_p=0.9,
                do_sample=True,
                pad_token_id=tokenizer.eos_token_id
            )

        response = tokenizer.decode(outputs[0][inputs["input_ids"].shape[-1]:], skip_special_tokens=True)
        return {"status": "success", "generated_text": response.strip()}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.post("/generate-stream")
async def generate_text_stream(request: PromptRequest):
    """Streaming endpoint — sends tokens as they're generated using Server-Sent Events."""
    messages = build_messages(request.text)
    inputs = tokenizer.apply_chat_template(
        messages, return_tensors="pt", add_generation_prompt=True, return_dict=True
    ).to(device)

    streamer = TextIteratorStreamer(tokenizer, skip_prompt=True, skip_special_tokens=True)

    generation_kwargs = dict(
        **inputs,
        streamer=streamer,
        max_new_tokens=request.max_tokens,
        temperature=0.3,
        top_p=0.9,
        do_sample=True,
        pad_token_id=tokenizer.eos_token_id,
    )

    thread = Thread(target=model.generate, kwargs=generation_kwargs)
    thread.start()

    async def event_generator():
        try:
            for token_text in streamer:
                if token_text:
                    payload = json.dumps({"token": token_text})
                    yield f"data: {payload}\n\n"
                    await asyncio.sleep(0)
            yield f"data: {json.dumps({'done': True})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")