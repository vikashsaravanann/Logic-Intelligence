"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, CheckCircle2, ChevronRight, MonitorSmartphone, Building2, ShoppingCart, Hotel, Map, Cpu, Gamepad2, Blocks } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const projectTypes = [
  { id: "Business Website", icon: Building2, label: "Business/Corporate" },
  { id: "E-Commerce", icon: ShoppingCart, label: "E-Commerce Platform" },
  { id: "Hotel Website", icon: Hotel, label: "Hotel & Booking" },
  { id: "Travel Agency", icon: Map, label: "Travel Agency System" },
  { id: "Custom Software", icon: Cpu, label: "Custom Software" },
  { id: "Game Development", icon: Gamepad2, label: "Game Development" },
  { id: "Portfolio", icon: MonitorSmartphone, label: "Portfolio / Personal" },
  { id: "Other", icon: Blocks, label: "Other / Custom" }
];

function QuoteContent() {
  const searchParams = useSearchParams();
  const initialPackage = searchParams.get("package") || "";
  const initialService = searchParams.get("service") || "";

  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: initialService || "",
    selectedPackage: initialPackage,
    budget: "",
    timeline: "",
    details: ""
  });

  useEffect(() => {
    if (initialPackage) setForm(f => ({ ...f, selectedPackage: initialPackage }));
    if (initialService) setForm(f => ({ ...f, projectType: initialService }));
  }, [initialPackage, initialService]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }

    const subject = encodeURIComponent(`New Project Inquiry: ${form.projectType || form.selectedPackage} from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Project Type: ${form.projectType}\n` +
      `Selected Package: ${form.selectedPackage}\n` +
      `Estimated Budget: ${form.budget}\n` +
      `Expected Timeline: ${form.timeline}\n\n` +
      `Project Details:\n${form.details}`
    );
    
    window.open(`mailto:startupwithvikashsaravanan@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const inputClass = "w-full px-5 py-4 bg-zinc-950 border border-white/10 rounded-2xl text-base text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all hover:border-white/20";
  const selectClass = `${inputClass} appearance-none cursor-pointer bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%23a1a1aa%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1.2rem_center] bg-[length:1.2em_1.2em] pr-12`;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-10">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Let's build your vision.</h1>
          <p className="text-lg text-zinc-400 font-medium">Fill out the details below so we can prepare a tailored strategy.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm font-bold text-primary">Step {step} of 3</span>
        </div>
      </div>

      {/* Progress Steps Indicator */}
      <div className="flex items-center gap-3 mb-14">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex-1 flex flex-col gap-3">
            <div className="h-1.5 w-full rounded-full bg-zinc-800 relative overflow-hidden">
              <motion.div 
                initial={false}
                animate={{ width: step >= s ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`absolute inset-0 rounded-full ${step > s ? 'bg-accent' : 'bg-primary'}`} 
              />
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="min-h-[400px] flex flex-col justify-between">
        
        <AnimatePresence mode="wait">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold">1. Contact Information</h3>
                <p className="text-zinc-500">How should we reach you?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Full Name *</label>
                  <input type="text" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Email Address *</label>
                  <input type="email" required placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Phone Number</label>
                <input type="tel" placeholder="+91 9876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
              </div>
            </motion.div>
          )}

          {/* STEP 2: Project Scope */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold">2. Project Scope</h3>
                <p className="text-zinc-500">What are we building together?</p>
              </div>

              {/* Premium Grid Selector for Project Type */}
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Type of Project *</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {projectTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setForm({ ...form, projectType: type.id })}
                      className={`flex flex-col items-center text-center gap-3 p-4 rounded-2xl border transition-all ${form.projectType === type.id ? 'bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(0,191,255,0.15)] scale-[1.02]' : 'bg-zinc-950 border-white/5 text-zinc-400 hover:border-white/20 hover:bg-zinc-900'}`}
                    >
                      <type.icon className="h-6 w-6" />
                      <span className="text-sm font-semibold">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Selected Package (Optional)</label>
                <select value={form.selectedPackage} onChange={e => setForm({ ...form, selectedPackage: e.target.value })} className={selectClass}>
                  <option value="" className="bg-zinc-900">Custom / Not Sure Yet</option>
                  <option value="digital-launch" className="bg-zinc-900">Digital Launch Pack (₹8K–₹20K)</option>
                  <option value="business-pro" className="bg-zinc-900">Business Pro Pack (₹20K–₹50K)</option>
                  <option value="enterprise" className="bg-zinc-900">Full Stack Enterprise (₹50K–₹1.5L)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Estimated Budget</label>
                  <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className={selectClass}>
                    <option value="" disabled hidden className="bg-zinc-900">Select budget range...</option>
                    <option value="Under ₹20K" className="bg-zinc-900">Under ₹20,000</option>
                    <option value="₹20K - ₹50K" className="bg-zinc-900">₹20,000 - ₹50,000</option>
                    <option value="₹50K - ₹1L" className="bg-zinc-900">₹50,000 - ₹1,00,000</option>
                    <option value="₹1L+" className="bg-zinc-900">₹1,00,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Expected Timeline</label>
                  <select value={form.timeline} onChange={e => setForm({ ...form, timeline: e.target.value })} className={selectClass}>
                    <option value="" disabled hidden className="bg-zinc-900">Select ideal timeline...</option>
                    <option value="ASAP" className="bg-zinc-900">As soon as possible</option>
                    <option value="1-2 Months" className="bg-zinc-900">1 - 2 Months</option>
                    <option value="3+ Months" className="bg-zinc-900">3+ Months</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Details */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="space-y-8">
              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-bold">3. Final Details</h3>
                <p className="text-zinc-500">Give us a brief description of the vision.</p>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Tell us about your project *</label>
                <textarea required rows={8} placeholder="What are the main goals? Do you have reference websites? What specific features (like bookings, payments, maps) do you need?" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className={`${inputClass} resize-none`} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form Footer Controls */}
        <div className="mt-14 pt-8 border-t border-white/5 flex items-center justify-between">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <div />
          )}
          
          <button type="submit" className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-95 ${step === 3 ? 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 shadow-primary/20' : 'bg-white text-black hover:bg-zinc-200'}`}>
            {step === 3 ? (
              <>Submit Request <Send className="h-4 w-4" /></>
            ) : (
              <>Continue <ChevronRight className="h-4 w-4" /></>
            )}
          </button>
        </div>

      </form>
    </>
  );
}

export default function QuotePage() {
  const [sent, setSent] = useState(false);
  // Just keeping 'sent' here for the top level successful response
  // To avoid prop drilling and keep it simple, we could either keep 'sent' in QuoteContent 
  // and handle it there, but let's just make the whole inner content Suspense and wrap it

  return (
    <main className="min-h-screen bg-black text-white selection:bg-primary/30 flex flex-col">
      <Navbar />

      <section className="flex-grow pt-32 pb-24 px-6 relative flex flex-col justify-center">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] opacity-[0.07] blur-[100px] bg-gradient-to-b from-primary to-accent pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto w-full relative z-10">
          <Link href="/#packages" className="inline-flex items-center text-sm font-bold text-zinc-400 hover:text-primary transition-colors mb-8 group">
            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 rounded-[2rem] bg-zinc-900/40 border border-white/10 text-center backdrop-blur-2xl">
              <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Request Sent Successfully!</h2>
              <p className="text-xl text-zinc-400 mb-10 max-w-xl mx-auto">
                Thank you. We have received your project details and will be in touch within 24 hours to discuss the next steps.
              </p>
              <button onClick={() => { setSent(false); }} 
                className="px-8 py-4 rounded-xl text-base font-bold text-black bg-white hover:bg-zinc-200 transition-colors hover:scale-105 active:scale-95">
                Start New Request
              </button>
            </motion.div>
          ) : (
            <div className="p-8 md:p-14 rounded-[2.5rem] bg-zinc-900/60 border border-white/5 backdrop-blur-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <Suspense fallback={<div className="min-h-[400px] flex items-center justify-center text-zinc-500">Loading form...</div>}>
                <QuoteContent />
              </Suspense>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
