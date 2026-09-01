"use client";
import { Mail, Phone, MapPin, Send, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { COMPANY } from "@/config/company";
import { useState } from "react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: COMPANY.instagramUrl, hoverColor: "group-hover:text-[#e1306c]" },
  { icon: LinkedinIcon,  label: "LinkedIn",  href: COMPANY.linkedinUrl,  hoverColor: "group-hover:text-[#0a66c2]" },
  { icon: FacebookIcon,  label: "Facebook",  href: COMPANY.facebookUrl,  hoverColor: "group-hover:text-[#1877f2]" },
  { icon: WhatsappIcon,  label: "WhatsApp",  href: COMPANY.whatsappGroupUrl, hoverColor: "group-hover:text-[#25d366]" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#060B18] pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* --- Premium Background Effects --- */}
      {/* Top glowing line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/80 to-transparent" />
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzvy8s93j/image/upload/v1727781033/grid_q4w49h.svg')] bg-center opacity-[0.03] pointer-events-none" />
      {/* Glow Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-accent/10 blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand & Contact (Takes up 4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-max">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-tr from-primary to-accent p-0.5 shadow-[0_0_20px_rgba(0,191,255,0.2)]">
                <div className="w-full h-full bg-[#060B18] rounded-[10px] flex items-center justify-center overflow-hidden">
                  <img
                    src={COMPANY.logoIconPath}
                    alt="Logo"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-white">LIT</span>';
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm md:text-base font-black text-white tracking-widest leading-none uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                  LOGIC INTELLIGENCE TECHNOLOGIES
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm mt-2">
              Coimbatore&apos;s premier AI-integrated development studio. We build intelligent software, modern websites, and scalable apps to drive your business forward.
            </p>

            <ul className="flex flex-col gap-3 mt-2">
              <li>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group w-max">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  {COMPANY.email}
                </a>
              </li>
              <li>
                <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group w-max">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  {COMPANY.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions (Takes up 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Solutions</h3>
            <ul className="flex flex-col gap-4">
              {['AI Integration', 'Web Development', 'Mobile Apps', 'UI/UX Design', 'Custom Software'].map((item) => (
                <li key={item}>
                  <Link href="/#services" className="text-zinc-400 hover:text-primary text-sm flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company (Takes up 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Company</h3>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'About Us', href: '/#about' },
                { label: 'Our Work', href: '/#portfolio' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Refund Policy', href: '/refund-policy' },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-zinc-400 hover:text-white text-sm flex items-center gap-2 group transition-colors">
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-white" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Connected & Newsletter (Takes up 4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest">Stay Connected</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Subscribe to our newsletter for the latest updates on AI, development trends, and company news.
            </p>

            <form onSubmit={handleSubscribe} className="relative mt-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all pr-12"
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square bg-gradient-to-tr from-primary to-accent rounded-lg flex items-center justify-center text-white hover:scale-105 transition-transform"
                title="Subscribe"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-primary font-medium animate-pulse">Thank you for subscribing!</p>
            )}

            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, label, href, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 transition-all hover:bg-white/10 hover:border-white/20 hover:scale-110 group"
                  title={label}
                >
                  <Icon className={`w-4 h-4 transition-colors ${hoverColor}`} />
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
             <p className="text-xs font-medium text-zinc-400">All systems operational</p>
          </div>
          
          <p className="text-xs text-zinc-500 text-center md:text-right">
            © {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved.<br className="md:hidden" /> 
            <span className="hidden md:inline"> | </span>CIN: {COMPANY.cin}
          </p>
        </div>

      </div>
    </footer>
  );
}
