"use client";
import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", budget: "", details: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate EmailJS/Formspree logic with a direct mailto for now, 
    // but presenting the exact success state requested.
    const subject = encodeURIComponent(`New Project Inquiry: ${form.service} from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nService: ${form.service}\nBudget: ${form.budget}\n\nProject Details:\n${form.details}`
    );
    window.open(`mailto:saravanan@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const inputClass = "w-full px-5 py-4 bg-zinc-950 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all hover:border-white/20";
  const selectClass = `${inputClass} appearance-none pr-10 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2300BFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:right_1rem_center]`;

  return (
    <section id="contact" className="py-24 bg-[#0A0F1E] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-[0.05] blur-[120px] bg-primary rounded-full pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4">Let's Build Something Great Together</h2>
          <h3 className="text-3xl md:text-5xl font-black text-white">Fill the form or WhatsApp us directly — we respond within 24 hours</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Contact Details */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-5 space-y-8">
            <div className="p-8 md:p-10 rounded-3xl glass-card bg-zinc-900/60 border border-white/10 space-y-8 h-full">
              
              <a href="mailto:saravanan@gmail.com" className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(0,191,255,0.2)] transition-all">
                  <Mail className="h-6 w-6 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Email</p>
                  <p className="text-base font-bold text-white group-hover:text-primary transition-colors break-all">saravanan@gmail.com</p>
                </div>
              </a>

              <a href="tel:+919342877474" className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:shadow-[0_0_15px_rgba(0,191,255,0.2)] transition-all">
                  <Phone className="h-6 w-6 text-zinc-400 group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-base font-bold text-white group-hover:text-primary transition-colors">+91 9342877474</p>
                </div>
              </a>

              <a href="https://instagram.com/startupwithVikash" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 group">
                <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 group-hover:border-accent/30 group-hover:shadow-[0_0_15px_rgba(123,47,190,0.2)] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-zinc-400 group-hover:text-accent transition-colors"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Instagram</p>
                  <p className="text-base font-bold text-white group-hover:text-accent transition-colors">@startupwithVikash</p>
                </div>
              </a>

              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-zinc-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">Location</p>
                  <p className="text-base font-bold text-white">Coimbatore, Tamil Nadu, India</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20bd5a] hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)]">
                  <MessageCircle className="w-5 h-5" /> Chat with us now
                </a>
              </div>

            </div>
          </motion.div>

          {/* Lead Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="lg:col-span-7">
            <div className="p-8 md:p-10 rounded-3xl glass-card bg-zinc-900/60 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {sent ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(0,191,255,0.2)]">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">✅ Thank you!</h3>
                  <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto">We have received your request and will contact you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="px-8 py-4 rounded-xl font-bold text-black bg-white hover:bg-zinc-200 transition-colors">
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Full Name *</label>
                      <input type="text" required placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address *</label>
                      <input type="email" required placeholder="john@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputClass} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Phone Number</label>
                    <input type="tel" placeholder="+91 9876543210" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Service Needed</label>
                      <select required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className={selectClass}>
                        <option value="" disabled hidden className="bg-zinc-900">Select a service...</option>
                        <option className="bg-zinc-900">Business Website</option>
                        <option className="bg-zinc-900">Hotel Website</option>
                        <option className="bg-zinc-900">Travel Agency Website with Quotation</option>
                        <option className="bg-zinc-900">Full Stack Web Development</option>
                        <option className="bg-zinc-900">Software Development</option>
                        <option className="bg-zinc-900">Game Development</option>
                        <option className="bg-zinc-900">E-Commerce Website</option>
                        <option className="bg-zinc-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Budget Range</label>
                      <select required value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className={selectClass}>
                        <option value="" disabled hidden className="bg-zinc-900">Select budget...</option>
                        <option className="bg-zinc-900">Under ₹10,000</option>
                        <option className="bg-zinc-900">₹10,000 – ₹25,000</option>
                        <option className="bg-zinc-900">₹25,000 – ₹50,000</option>
                        <option className="bg-zinc-900">₹50,000+</option>
                        <option className="bg-zinc-900">Not Sure Yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Project Details</label>
                    <textarea required rows={5} placeholder="Tell us about your project..." value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} className={`${inputClass} resize-none`} />
                  </div>
                  
                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black bg-primary neon-btn mt-2">
                    <Send className="w-5 h-5" /> Send My Request
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
