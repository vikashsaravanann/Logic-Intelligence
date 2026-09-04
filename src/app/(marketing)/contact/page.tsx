"use client";
import FloatingElements from "@/components/motion/floating-elements";
import BackToHome from "@/components/ui/back-to-home";
import { useState } from "react";
import { Send, CheckCircle2, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/config/company";

type FormData = {
  businessName: string;
  industry: string;
  existingUrl: string;
  serviceType: string;
  keyFeatures: string;
  designRefs: string;
  contentReady: string;
  budget: string;
  timeline: string;
  email: string;
  phone: string;
  notes: string;
};

const initialForm: FormData = {
  businessName: "",
  industry: "",
  existingUrl: "",
  serviceType: "",
  keyFeatures: "",
  designRefs: "",
  contentReady: "No",
  budget: "",
  timeline: "",
  email: "",
  phone: "",
  notes: "",
};

// Per-step required fields for inline validation
const stepRequirements: Record<number, (keyof FormData)[]> = {
  1: ["businessName", "industry"],
  2: ["serviceType"],
  3: ["budget", "timeline", "email", "phone"],
};

function validateStep(step: number, form: FormData): Partial<Record<keyof FormData, string>> {
  const errors: Partial<Record<keyof FormData, string>> = {};
  const required = stepRequirements[step] || [];
  for (const field of required) {
    if (!form[field]) {
      errors[field] = "This field is required.";
    }
  }
  if (step === 3) {
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = "Enter a valid email address.";
    }
    if (form.phone && !/^\+?[\d\s\-().]{7,}$/.test(form.phone)) {
      errors.phone = "Enter a valid phone number.";
    }
  }
  return errors;
}

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [form, setForm] = useState<FormData>(initialForm);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (fieldErrors[field]) setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateStep(step, form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      setFieldErrors({});
      return;
    }

    // Final step — submit to API
    setIsSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.businessName,
          email: form.email,
          phone: form.phone,
          companyName: form.businessName,
          projectType: form.serviceType,
          budgetRange: form.budget,
          timeline: form.timeline,
          description: `Industry: ${form.industry}\nExisting URL: ${form.existingUrl}\nFeatures: ${form.keyFeatures}\nDesign Refs: ${form.designRefs}\nContent Ready: ${form.contentReady}\nNotes: ${form.notes}`,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Submission failed. Please try again.");
      }
      setSent(true);
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong. Please try again or reach us on WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBase =
    "w-full px-5 py-4 bg-zinc-900/50 border rounded-xl text-base md:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all shadow-inner";
  const inputClass = (field: keyof FormData) =>
    `${inputBase} ${fieldErrors[field] ? "border-red-500/50" : "border-white/10"}`;
  const labelClass = "block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2";

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-24">
      <BackToHome />

      <section className="relative py-16 px-6 lg:px-8 overflow-hidden min-h-[80vh] flex flex-col justify-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-3xl mx-auto w-full relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Start Your Project</h1>
            <p className="text-zinc-400">Tell us about your requirements and we'll get back to you within 24 hours.</p>
          </div>

          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Inquiry Submitted!</h3>
                <p className="text-zinc-400 max-w-sm mx-auto mb-8">
                  Thank you for sharing your project details. We will review them and contact you within 24 hours.
                </p>
                <a
                  href={`https://wa.me/${COMPANY.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366]/10 text-[#25D366] font-bold text-sm border border-[#25D366]/20 hover:bg-[#25D366] hover:text-black transition-all"
                >
                  Message us on WhatsApp for faster response
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-12 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rounded-full z-0" />
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / 2) * 100}%` }}
                  />
                  {[1, 2, 3].map((s) => (
                    <div
                      key={s}
                      className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                        step >= s
                          ? "bg-primary text-black shadow-[0_0_15px_rgba(0,191,255,0.4)]"
                          : "bg-[#0A0F1E] text-zinc-500 border border-white/10"
                      }`}
                    >
                      {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
                    </div>
                  ))}
                </div>

                {/* Server Error */}
                {serverError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    {serverError}
                  </motion.div>
                )}

                <AnimatePresence mode="wait">
                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6">1. Business Details</h3>
                      <div>
                        <label className={labelClass}>Business / Company Name *</label>
                        <input type="text" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} className={inputClass("businessName")} placeholder="Acme Corp" />
                        {fieldErrors.businessName && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.businessName}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Industry / Niche *</label>
                        <input type="text" value={form.industry} onChange={(e) => update("industry", e.target.value)} className={inputClass("industry")} placeholder="e.g. Real Estate, Hotel, E-commerce" />
                        {fieldErrors.industry && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.industry}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Existing Website URL (Optional)</label>
                        <input type="url" value={form.existingUrl} onChange={(e) => update("existingUrl", e.target.value)} className={inputClass("existingUrl")} placeholder="https://example.com" />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6">2. Project Scope</h3>
                      <div>
                        <label className={labelClass}>Type of Service Needed *</label>
                        <select value={form.serviceType} onChange={(e) => update("serviceType", e.target.value)} className={inputClass("serviceType")}>
                          <option value="" disabled>Select Service</option>
                          <option className="bg-zinc-900">Corporate Website</option>
                          <option className="bg-zinc-900">E-Commerce Store</option>
                          <option className="bg-zinc-900">Custom Web App / Portal</option>
                          <option className="bg-zinc-900">Mobile App</option>
                          <option className="bg-zinc-900">UI/UX Design</option>
                          <option className="bg-zinc-900">Other</option>
                        </select>
                        {fieldErrors.serviceType && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.serviceType}</p>}
                      </div>
                      <div>
                        <label className={labelClass}>Key Features Required</label>
                        <textarea rows={3} value={form.keyFeatures} onChange={(e) => update("keyFeatures", e.target.value)} className={inputClass("keyFeatures")} placeholder="e.g. Booking system, Payment gateway, User login…"></textarea>
                      </div>
                      <div>
                        <label className={labelClass}>Design References (Optional)</label>
                        <input type="text" value={form.designRefs} onChange={(e) => update("designRefs", e.target.value)} className={inputClass("designRefs")} placeholder="Links to websites you like" />
                      </div>
                      <div>
                        <label className={labelClass}>Is your content (text/images) ready?</label>
                        <select value={form.contentReady} onChange={(e) => update("contentReady", e.target.value)} className={inputClass("contentReady")}>
                          <option className="bg-zinc-900">Yes, completely ready</option>
                          <option className="bg-zinc-900">Partially ready</option>
                          <option className="bg-zinc-900">No, I need help with content</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-6">3. Budget &amp; Contact</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Estimated Budget Range *</label>
                          <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className={inputClass("budget")}>
                            <option value="" disabled>Select Budget</option>
                            <option className="bg-zinc-900">Under ₹10,000</option>
                            <option className="bg-zinc-900">₹10,000 - ₹25,000</option>
                            <option className="bg-zinc-900">₹25,000 - ₹50,000</option>
                            <option className="bg-zinc-900">₹50,000+</option>
                          </select>
                          {fieldErrors.budget && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.budget}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Expected Timeline *</label>
                          <select value={form.timeline} onChange={(e) => update("timeline", e.target.value)} className={inputClass("timeline")}>
                            <option value="" disabled>Select Timeline</option>
                            <option className="bg-zinc-900">ASAP (Urgent)</option>
                            <option className="bg-zinc-900">1-2 Weeks</option>
                            <option className="bg-zinc-900">3-4 Weeks</option>
                            <option className="bg-zinc-900">Flexible</option>
                          </select>
                          {fieldErrors.timeline && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.timeline}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className={labelClass}>Email Address *</label>
                          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputClass("email")} placeholder="you@example.com" />
                          {fieldErrors.email && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.email}</p>}
                        </div>
                        <div>
                          <label className={labelClass}>Phone / WhatsApp *</label>
                          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputClass("phone")} placeholder="+91 98765 43210" />
                          {fieldErrors.phone && <p className="mt-1.5 text-xs text-red-400">{fieldErrors.phone}</p>}
                        </div>
                      </div>

                      <div>
                        <label className={labelClass}>Any other notes?</label>
                        <textarea rows={2} value={form.notes} onChange={(e) => update("notes", e.target.value)} className={inputClass("notes")}></textarea>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-10 flex items-center justify-between pt-6 border-t border-white/5">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => { setStep(step - 1); setFieldErrors({}); }}
                      className="px-6 py-4 rounded-xl text-sm font-bold text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 rounded-xl text-sm font-bold text-black bg-white hover:bg-primary transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,191,255,0.4)] flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black/40 border-t-black rounded-full animate-spin" />
                        Submitting…
                      </>
                    ) : step === 3 ? (
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

      <FloatingElements />
    </main>
  );
}
