"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatingElements from "@/components/FloatingElements";
import { useState } from "react";
import { Send, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    industry: "",
    existingUrl: "",
    serviceType: "",
    keyFeatures: "",
    designRefs: "",
    contentReady: "No",
    budget: "",
    timeline: "",
    preferredContact: "Email",
    email: "",
    phone: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const subject = encodeURIComponent(`New Project Inquiry: ${form.businessName}`);
    const body = encodeURIComponent(
      `Business: ${form.businessName}\nIndustry: ${form.industry}\nExisting URL: ${form.existingUrl}\n\nService: ${form.serviceType}\nFeatures: ${form.keyFeatures}\nDesign Refs: ${form.designRefs}\nContent Ready: ${form.contentReady}\n\nBudget: ${form.budget}\nTimeline: ${form.timeline}\nContact Method: ${form.preferredContact}\nEmail: ${form.email}\nPhone: ${form.phone}\nNotes: ${form.notes}`
    );
    window.open(`mailto:startupwithvikashsaravanan@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const inputClass = "w-full px-5 py-4 bg-zinc-900/50 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner";
  const labelClass = "block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2";

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-24">
      <Navbar />
      
      <section className="relative py-20 px-6 lg:px-8 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Start Your Project</h1>
            <p className="text-zinc-400">Tell us about your requirements and we'll get back to you with a customized plan.</p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Inquiry Submitted!</h3>
                <p className="text-zinc-400 max-w-sm mx-auto">Thank you for sharing your project details. We will review them and contact you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-12 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full z-0" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                  
                  {[1, 2, 3].map(s => (
                    <div key={s} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= s ? "bg-primary text-black shadow-[0_0_15px_rgba(0,191,255,0.4)]" : "bg-[#0A0F1E] text-zinc-500 border border-white/10"}`}>
                      {s}
                    </div>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6">1. Business Details</h3>
                      <div>
                        <label className={labelClass}>Business / Company Name *</label>
                        <input type="text" required value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} className={inputClass} placeholder="Acme Corp" />
                      </div>
                      <div>
                        <label className={labelClass}>Industry / Niche *</label>
                        <input type="text" required value={form.industry} onChange={e => setForm({...form, industry: e.target.value})} className={inputClass} placeholder="e.g. Real Estate, Hotel, E-commerce" />
                      </div>
                      <div>
                        <label className={labelClass}>Existing Website URL (Optional)</label>
                        <input type="url" value={form.existingUrl} onChange={e => setForm({...form, existingUrl: e.target.value})} className={inputClass} placeholder="https://example.com" />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6">2. Project Scope</h3>
                      <div>
                        <label className={labelClass}>Type of Service Needed *</label>
                        <select required value={form.serviceType} onChange={e => setForm({...form, serviceType: e.target.value})} className={inputClass}>
                          <option value="" disabled hidden>Select Service</option>
                          <option className="bg-zinc-900">Corporate Website</option>
                          <option className="bg-zinc-900">E-Commerce Store</option>
                          <option className="bg-zinc-900">Custom Web App / Portal</option>
                          <option className="bg-zinc-900">Mobile App</option>
                          <option className="bg-zinc-900">UI/UX Design</option>
                          <option className="bg-zinc-900">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Key Features Required</label>
                        <textarea rows={3} value={form.keyFeatures} onChange={e => setForm({...form, keyFeatures: e.target.value})} className={inputClass} placeholder="e.g. Booking system, Payment gateway, User login..."></textarea>
                      </div>
                      <div>
                        <label className={labelClass}>Design References (Optional)</label>
                        <input type="text" value={form.designRefs} onChange={e => setForm({...form, designRefs: e.target.value})} className={inputClass} placeholder="Links to websites you like" />
                      </div>
                      <div>
                        <label className={labelClass}>Is your content (text/images) ready?</label>
                        <select value={form.contentReady} onChange={e => setForm({...form, contentReady: e.target.value})} className={inputClass}>
                          <option className="bg-zinc-900">Yes, completely ready</option>
                          <option className="bg-zinc-900">Partially ready</option>
                          <option className="bg-zinc-900">No, I need help with content</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6">3. Budget & Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Estimated Budget Range *</label>
                          <select required value={form.budget} onChange={e => setForm({...form, budget: e.target.value})} className={inputClass}>
                            <option value="" disabled hidden>Select Budget</option>
                            <option className="bg-zinc-900">Under ₹10,000</option>
                            <option className="bg-zinc-900">₹10,000 - ₹25,000</option>
                            <option className="bg-zinc-900">₹25,000 - ₹50,000</option>
                            <option className="bg-zinc-900">₹50,000+</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>Expected Timeline *</label>
                          <select required value={form.timeline} onChange={e => setForm({...form, timeline: e.target.value})} className={inputClass}>
                            <option value="" disabled hidden>Select Timeline</option>
                            <option className="bg-zinc-900">ASAP (Urgent)</option>
                            <option className="bg-zinc-900">1-2 Weeks</option>
                            <option className="bg-zinc-900">3-4 Weeks</option>
                            <option className="bg-zinc-900">Flexible</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} placeholder="you@example.com" />
                        </div>
                        <div>
                          <label className={labelClass}>Phone / WhatsApp *</label>
                          <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} placeholder="+91 98765 43210" />
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Any other notes?</label>
                        <textarea rows={2} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} className={inputClass}></textarea>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/5">
                  {step > 1 ? (
                    <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl text-sm font-bold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : <div></div>}
                  
                  <button type="submit" className="px-8 py-3 rounded-xl text-sm font-bold text-black bg-white hover:bg-primary transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] flex items-center gap-2">
                    {step === 3 ? (
                      <><Send className="w-4 h-4" /> Submit Inquiry</>
                    ) : (
                      <>Next Step <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
