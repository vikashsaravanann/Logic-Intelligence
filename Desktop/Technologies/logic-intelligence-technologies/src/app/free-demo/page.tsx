"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Clock, Zap, ShieldCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FreeDemoPage() {
  const [sent, setSent] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Free Demo Request: ${form.businessName}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.businessName}\nEmail: ${form.email}\nPhone: ${form.phone}\nRequirements: ${form.requirements}`
    );
    window.open(`mailto:startupwithvikashsaravanan@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const inputClass = "w-full px-5 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner";

  const faqs = [
    { q: "Is the demo really 100% free?", a: "Yes. We build a high-fidelity mockup and the first functional page of your website completely free. You only pay if you decide to proceed with the full project." },
    { q: "What if I don't like the demo?", a: "No problem at all. You can either give us feedback to revise it, or walk away with no obligations and no charges." },
    { q: "How long does it take to get the demo?", a: "Once you submit your requirements, we deliver the initial demo link within 48 to 72 hours." },
    { q: "Do I need to provide hosting or a domain?", a: "Not for the demo. We host the demo on our secure staging servers so you can preview it instantly." }
  ];

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-24">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
            <Zap className="w-4 h-4" /> Zero Risk. Zero Commitment.
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            See Your Website <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Before You Pay Anything</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            We'll design and build a functional demo of your vision within 48 hours. If you love it, we build the rest. If not, it costs you nothing.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Process & Trust */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Clock className="w-6 h-6 text-primary" /> How It Works
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-white/10 before:to-transparent">
                {[
                  { step: 1, title: "Share Details", desc: "Tell us about your business and goals using the simple form." },
                  { step: 2, title: "We Design Demo", desc: "Our team builds a bespoke, functional preview within 48-72 hrs." },
                  { step: 3, title: "You Review It", desc: "Interact with the live demo link and provide feedback." },
                  { step: 4, title: "Approve & Build", desc: "Only pay when you're 100% satisfied and ready to launch." }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#0A0F1E] border-2 border-primary flex items-center justify-center shrink-0 text-white font-black shadow-[0_0_15px_rgba(0,191,255,0.3)] z-10">
                      {item.step}
                    </div>
                    <div className="pt-1.5">
                      <h4 className="text-lg font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-primary" /> Expected Turnaround
                </h4>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  Standard demo requests are processed and delivered via a secure staging link within <strong className="text-white">48 to 72 hours</strong> depending on complexity.
                </p>
                <a href="https://wa.me/918072120016" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-bold text-sm border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black transition-all shadow-[0_0_20px_rgba(37,211,102,0.1)]">
                  <MessageSquare className="w-4 h-4" /> Discuss on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form & FAQ */}
          <div className="lg:col-span-7 space-y-12">
            <div className="p-8 md:p-12 rounded-[2.5rem] bg-zinc-900/40 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
              
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                    <CheckCircle2 className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-4xl font-black text-white mb-4">Request Received!</h3>
                  <p className="text-lg text-zinc-400 mb-8 max-w-sm mx-auto">We're reviewing your requirements and will reach out shortly to confirm the demo timeline.</p>
                </motion.div>
              ) : (
                <>
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-white mb-2">Request Free Demo</h3>
                    <p className="text-zinc-400 text-sm">Fill out the essentials, and we'll handle the rest.</p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Your Name *</label>
                        <input type="text" required placeholder="John Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Business Name *</label>
                        <input type="text" required placeholder="Acme Corp" value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Email Address *</label>
                        <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Phone / WhatsApp *</label>
                        <input type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Brief Requirements</label>
                      <textarea rows={4} placeholder="E.g., I need a booking website for my boutique hotel in Goa. Prefer dark premium design." value={form.requirements} onChange={e => setForm({...form, requirements: e.target.value})} className={inputClass}></textarea>
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black bg-white hover:bg-primary transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] mt-4">
                      <Send className="w-5 h-5" /> Start My Free Demo
                    </button>
                    <p className="text-center text-xs text-zinc-500 mt-4 flex justify-center items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Your data is secure and never shared.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* FAQ Section */}
            <div className="pt-12 border-t border-white/5">
              <h3 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="border border-white/10 rounded-2xl bg-white/[0.01] overflow-hidden">
                    <button 
                      onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      className="w-full flex items-center justify-between p-6 text-left"
                    >
                      <span className="font-bold text-white pr-8">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === i && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-6 pb-6"
                        >
                          <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
