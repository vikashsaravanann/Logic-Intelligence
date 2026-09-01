"use client";
import { Mail, Phone, MapPin, MessageCircle, Heart, Send } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/config/company";

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
  { icon: InstagramIcon, label: "Instagram", href: COMPANY.instagramUrl,    hoverColor: "hover:text-[#e1306c] hover:border-[#e1306c]/30 hover:bg-[#e1306c]/10" },
  { icon: LinkedinIcon,  label: "LinkedIn",  href: COMPANY.linkedinUrl,     hoverColor: "hover:text-[#0a66c2] hover:border-[#0a66c2]/30 hover:bg-[#0a66c2]/10" },
  { icon: FacebookIcon,  label: "Facebook",  href: COMPANY.facebookUrl,     hoverColor: "hover:text-[#1877f2] hover:border-[#1877f2]/30 hover:bg-[#1877f2]/10" },
  { icon: WhatsappIcon, label: "WhatsApp",  href: COMPANY.whatsappGroupUrl, hoverColor: "hover:text-[#25d366] hover:border-[#25d366]/30 hover:bg-[#25d366]/10" },
  { icon: Send,          label: "Telegram",  href: COMPANY.telegramBotUrl,  hoverColor: "hover:text-[#2aabee] hover:border-[#2aabee]/30 hover:bg-[#2aabee]/10" },
];

const legalLinks = [
  { label: "Terms of Service",      href: "/terms" },
  { label: "Privacy Policy",        href: "/privacy" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060B18] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Top gradient edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      {/* Decorative Background Elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Widgets Grid (4 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & Identity */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-gradient-to-tr from-primary to-accent shadow-[0_0_15px_rgba(0,191,255,0.3)] animate-neon-pulse">
                <img
                  src={COMPANY.logoIconPath}
                  alt={`${COMPANY.displayName} logo`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="font-bold text-lg text-white">LIT</span>';
                  }}
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm lg:text-base font-bold text-white tracking-wider leading-tight">
                  LOGIC INTELLIGENCE
                </span>
                <span className="text-xs text-primary font-semibold tracking-widest uppercase">
                  Technologies
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              &quot;{COMPANY.tagline}&quot; — Coimbatore&apos;s AI-integrated development studio.
              Delivering transparent pricing and modern solutions.
            </p>

            {/* Social Buttons under Brand */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {socialLinks.map(({ icon: Icon, label, href, hoverColor }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] text-zinc-400 transition-all duration-300 hover:scale-110 ${hoverColor}`}
                  title={label}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg border-b border-white/10 pb-2 inline-block w-max">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/#about" },
                { label: "AI Solutions", href: "/#services" },
                { label: "Web Development", href: "/#services" },
                { label: "Our Work", href: "/#portfolio" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-primary hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg border-b border-white/10 pb-2 inline-block w-max">
              Legal & Support
            </h3>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/contact"
                  className="text-sm text-zinc-400 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col gap-6">
             <h3 className="text-white font-bold text-lg border-b border-white/10 pb-2 inline-block w-max">
              Get in Touch
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="group flex items-start gap-3 w-max max-w-full"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    <Mail className="h-4 w-4 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors break-all leading-8">
                    {COMPANY.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="group flex items-start gap-3 w-max"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                    <Phone className="h-4 w-4 text-zinc-400 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors leading-8">
                    {COMPANY.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4 text-zinc-400" />
                 </div>
                <span className="text-sm text-zinc-400 leading-snug pt-1.5">{COMPANY.address}</span>
              </li>
            </ul>

            <div className="mt-2">
              <a
                href={`https://wa.me/${COMPANY.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform shadow-[0_0_15px_rgba(37,211,102,0.3)] w-full sm:w-auto"
              >
                <WhatsappIcon className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-zinc-500 max-w-2xl">
            © {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved. | CIN: {COMPANY.cin}
          </p>
        </div>

      </div>
    </footer>
  );
}
