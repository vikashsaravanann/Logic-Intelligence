"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-[#0A0F1E] border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
      
      <div className="mx-auto max-w-4xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Start Your Project</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Project Intake Form</h2>
          <p className="text-zinc-400 text-lg">
            Tell us about your requirements. We typically respond with a proposal within 24 hours.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#060B18] p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative"
        >
          {status === "success" ? (
            <div className="text-center py-20">
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-white mb-4">Request Received!</h3>
              <p className="text-zinc-400 text-lg mb-8">
                Thank you for reaching out. One of our project managers will contact you within 24 hours.
              </p>
              <button 
                onClick={() => setStatus("idle")}
                className="px-8 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
              >
                Submit Another Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Company/Business Name *</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Acme Corp" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Industry/Type of Business *</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. Healthcare, Retail" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Existing Website URL (if any)</label>
                  <input type="url" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Service Needed *</label>
                  <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option value="" disabled selected>Select a service...</option>
                    <option value="Full Stack Web Development">Full Stack Web Development</option>
                    <option value="Hotel Website">Hotel Website</option>
                    <option value="Travel Agency Website">Travel Agency Website</option>
                    <option value="Custom Software">Custom Software</option>
                    <option value="E-Commerce Website">E-Commerce Website</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Website Hosting">Website Hosting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Budget Range *</label>
                  <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option value="" disabled selected>Select budget range...</option>
                    <option value="< $1,000">Less than $1,000</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-300">Content Readiness *</label>
                  <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option value="" disabled selected>Do you have content ready?</option>
                    <option value="Yes">Yes, text and images are ready</option>
                    <option value="Partial">I have some, need help with the rest</option>
                    <option value="No">No, I need content creation services</option>
                  </select>
                </div>
              </div>

              {/* Row 4 */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-medium text-zinc-300">Timeline / Deadline</label>
                  <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="e.g. 1 month, ASAP" />
                </div>
                <div className="space-y-2 col-span-1">
                  <label className="text-sm font-medium text-zinc-300">Preferred Contact *</label>
                  <select required className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                    <option value="Email">Email</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Call">Phone Call</option>
                  </select>
                </div>
              </div>

              {/* Full Width */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Design References (Optional)</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors" placeholder="Links to websites you like" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">Key Features & Additional Notes *</label>
                <textarea required rows={4} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none" placeholder="Describe the main functionalities, pages required, or any specific details..."></textarea>
              </div>

              <button 
                type="submit"
                disabled={status === "submitting"}
                className="w-full neon-btn rounded-xl py-4 flex items-center justify-center gap-2 font-bold text-white transition-all disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <span className="flex items-center gap-2">Processing...</span>
                ) : (
                  <span className="flex items-center gap-2"><Send className="w-5 h-5" /> Submit Project Details</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
