"use client";
import FloatingElements from "@/components/FloatingElements";
import BackToHome from "@/components/ui/back-to-home";
import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ChecklistPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create an array of 31 empty strings for the answers
  const [answers, setAnswers] = useState<string[]>(Array(31).fill(""));

  const questions = [
    // Section 1: Business Goals & Identity
    "What is the primary purpose of this website? (e.g., sell products, generate leads, provide information)",
    "What are the top 3 goals you want to achieve with this website in the next 12 months?",
    "How will you measure the success of this website? (e.g., number of inquiries, sales volume, traffic)",
    "What is your unique value proposition? Why should customers choose you over competitors?",
    "Who are your top 3 main competitors? (please provide URLs if possible)",
    
    // Section 2: Target Audience
    "Who is your ideal customer or user?",
    "What industry or sector are you in?",
    "Do you have an existing brand name and tagline?",
    "Do you currently have a website? (share the URL if yes)",
    "What do you want to keep from your current site, if anything?",
    
    // Section 3: Features & Functionality
    "Roughly how many pages will you need?",
    "Do you need an online store / payment processing?",
    "Do you need a booking or appointment system?",
    "Do you need a blog or news section?",
    "Do you need multi-language support?",
    "Do you need user accounts / a login area?",
    "Do you need admin tools to update content yourself?",
    "Do you need integrations with other tools (CRM, email, etc.)?",
    
    // Section 4: Design & Branding
    "Do you have a logo ready?",
    "Do you have brand colors / fonts defined?",
    "Do you have photos or videos ready to use?",
    "Are there websites whose design you admire?",
    "Are there any design styles you want to avoid?",
    
    // Section 5: Technical & Logistics
    "Do you already own a domain name?",
    "Do you already have hosting set up?",
    "Do you need help with SEO?",
    "Do you need ongoing maintenance after launch?",
    "Any specific technical requirements or existing systems to integrate with?",
    
    // Section 6: Budget & Timeline
    "What is your expected budget range?",
    "What is your ideal launch date?",
    "Is there anything else important we should know?"
  ];

  const sections = [
    { title: "Business Goals & Identity", start: 0, end: 5 },
    { title: "Target Audience", start: 5, end: 10 },
    { title: "Features & Functionality", start: 10, end: 18 },
    { title: "Design & Branding", start: 18, end: 23 },
    { title: "Technical & Logistics", start: 23, end: 28 },
    { title: "Budget & Timeline", start: 28, end: 31 }
  ];

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const [email, setEmail] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      alert("Please provide an email address to receive a copy.");
      return;
    }
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/checklist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, email }),
      });
      
      if (res.ok) {
        setSent(true);
      } else {
        console.error("Submission failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownload = () => {
    alert("In a real implementation, this would trigger jsPDF to download a PDF of your answers.");
  };

  const inputClass = "w-full px-4 py-3 bg-zinc-900/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner";
  const sectionTitleClass = "text-xl font-bold text-white mb-6 flex items-center gap-3";
  const sectionNumClass = "w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0";

  return (
    <main className="min-h-screen bg-[#0A0D1A] text-white pt-24">
      <BackToHome />
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
             Zero Risk. Zero Commitment.
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            31-Point Scoping <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Project Discovery Form</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-zinc-400 max-w-2xl mx-auto font-light mb-10">
            Tell us about your project in detail below. The more information you provide, the better we can scope your requirements and prepare a tailored demo.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto">
          {sent ? (
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20 bg-[#12172b] rounded-3xl border border-white/10 shadow-2xl p-12">
               <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                 <CheckCircle2 className="h-12 w-12 text-primary" />
               </div>
               <h3 className="text-4xl font-black text-white mb-4">Discovery Form Submitted!</h3>
               <p className="text-lg text-zinc-400 mb-8">Thanks — we've received your answers and our team will review them shortly to prepare your demo.</p>
               <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-bold text-sm border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black transition-all">
                 <MessageSquare className="w-4 h-4" /> Message on WhatsApp
               </a>
             </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="bg-[#12172b] p-8 md:p-10 rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full pointer-events-none" />
                
                {sections.map((section, sIdx) => (
                  <div key={sIdx} className={`mb-12 ${sIdx > 0 ? 'pt-12 border-t border-white/10' : ''}`}>
                    <h2 className={sectionTitleClass}>
                      <span className={sectionNumClass}>{sIdx + 1}</span> 
                      {section.title}
                    </h2>
                    
                    <div className="space-y-6">
                      {questions.slice(section.start, section.end).map((q, idx) => {
                        const globalIdx = section.start + idx;
                        return (
                          <div key={globalIdx}>
                            <label className="flex items-start gap-3 text-sm font-bold text-white mb-2">
                              <span className="w-6 h-6 rounded bg-white/5 text-primary flex items-center justify-center shrink-0 text-xs mt-0.5 border border-white/10">{globalIdx + 1}</span>
                              <span className="pt-1 leading-snug">{q}</span>
                            </label>
                            <div className="pl-9">
                              <textarea 
                                rows={2} 
                                placeholder="Your answer..." 
                                value={answers[globalIdx]} 
                                onChange={e => handleAnswerChange(globalIdx, e.target.value)} 
                                className={inputClass} 
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}

                <div className="mt-12 pt-12 border-t border-white/10">
                  <div className="mb-6">
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Email to receive your copy *</label>
                    <input type="email" required placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button type="button" onClick={handleDownload} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-zinc-800 hover:bg-zinc-700 transition-all border border-white/10">
                      <Download className="w-5 h-5" /> Download PDF
                    </button>
                    <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black bg-white hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Submitting...' : <><Send className="w-5 h-5" /> Send Answers</>}
                    </button>
                  </div>
                  <p className="text-center text-xs text-zinc-500 mt-6 flex justify-center items-center gap-1">
                    Downloading is instant and generated in your browser. Sending shares a copy with our team.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      <FloatingElements />
    </main>
  );
}
