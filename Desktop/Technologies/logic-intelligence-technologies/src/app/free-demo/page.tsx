"use client";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FloatingElements from "@/components/FloatingElements";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export default function FreeDemoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    businessName: "",
    businessType: "",
    location: "",
    email: "",
    phone: "",
    pages: [] as string[],
    theme: "",
    details: ""
  });

  const handleCheckbox = (page: string) => {
    if (form.pages.includes(page)) {
      setForm({ ...form, pages: form.pages.filter(p => p !== page) });
    } else {
      setForm({ ...form, pages: [...form.pages, page] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Free Demo Request: ${form.businessName}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nBusiness: ${form.businessName}\nType: ${form.businessType}\nLocation: ${form.location}\nEmail: ${form.email}\nPhone: ${form.phone}\nPages Needed: ${form.pages.join(", ")}\nTheme: ${form.theme}\nDetails: ${form.details}`
    );
    window.open(`mailto:startupwithvikashsaravanan@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSent(true);
  };

  const inputClass = "w-full px-5 py-4 bg-zinc-950 border border-white/10 rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all";

  return (
    <main className="min-h-screen bg-[#0A0F1E] text-white pt-32">
      <Navbar />
      
      <section className="py-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">See Your Website Before You Pay Anything</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">We Build You a Free Demo — Just Share Your Business Details. No risk. No pressure. No payment upfront.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-4 space-y-8">
            <div className="p-8 rounded-3xl glass-card bg-zinc-900/60 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">How It Works</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">1</div>
                  <p className="text-sm text-zinc-300 mt-1">Fill the form below</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">2</div>
                  <p className="text-sm text-zinc-300 mt-1">We build a free demo version of your website (1–2 pages) within 48 hours</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">3</div>
                  <p className="text-sm text-zinc-300 mt-1">You review it — if you love it, we build the full website for you</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 font-bold">4</div>
                  <p className="text-sm text-zinc-300 mt-1">You only pay when you decide to go ahead</p>
                </li>
              </ul>
            </div>
            
            <div className="p-6 rounded-3xl bg-accent/10 border border-accent/20">
              <h4 className="font-bold text-white mb-2">Why we do this?</h4>
              <p className="text-sm text-zinc-300">We are confident in our work. We would rather show you than tell you.</p>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="p-8 md:p-10 rounded-3xl glass-card bg-zinc-900/60 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              {sent ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Request Sent!</h3>
                  <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto">We'll review your details and start building your demo. We will contact you soon!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Your Name</label>
                      <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Business Name</label>
                      <input type="text" required value={form.businessName} onChange={e => setForm({...form, businessName: e.target.value})} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Business Type</label>
                      <select required value={form.businessType} onChange={e => setForm({...form, businessType: e.target.value})} className={inputClass}>
                        <option value="" disabled hidden>Select Type</option>
                        <option className="bg-zinc-900">Hotel</option>
                        <option className="bg-zinc-900">Travel</option>
                        <option className="bg-zinc-900">Shop / E-Commerce</option>
                        <option className="bg-zinc-900">Restaurant</option>
                        <option className="bg-zinc-900">Startup</option>
                        <option className="bg-zinc-900">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Location</label>
                      <input type="text" required placeholder="e.g. Coimbatore" value={form.location} onChange={e => setForm({...form, location: e.target.value})} className={inputClass} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Email</label>
                      <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">WhatsApp / Phone</label>
                      <input type="tel" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">What pages do you need?</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {["Home", "About", "Services", "Contact", "Gallery", "Booking", "Blog", "Shop"].map(page => (
                        <label key={page} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={form.pages.includes(page)} onChange={() => handleCheckbox(page)} className="w-4 h-4 rounded bg-zinc-900 border-white/20 text-primary focus:ring-primary/50" />
                          <span className="text-sm text-zinc-300">{page}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Preferred Theme</label>
                    <input type="text" placeholder="e.g. Dark, Light, Brand Colors..." value={form.theme} onChange={e => setForm({...form, theme: e.target.value})} className={inputClass} />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Additional Details</label>
                    <textarea rows={4} value={form.details} onChange={e => setForm({...form, details: e.target.value})} className={inputClass}></textarea>
                  </div>

                  <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-black bg-primary neon-btn mt-2">
                    <Send className="w-5 h-5" /> Request My Free Demo
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingElements />
    </main>
  );
}
