"use client";
import { Mail, Phone, MapPin, MessageCircle, Heart, Send, ExternalLink } from "lucide-react";
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

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram",      href: COMPANY.instagramUrl,    color: "hover:text-[#e1306c]" },
  { icon: LinkedinIcon,  label: "LinkedIn",       href: COMPANY.linkedinUrl,     color: "hover:text-[#0077b5]" },
  { icon: FacebookIcon,  label: "Facebook",       href: COMPANY.facebookUrl,     color: "hover:text-[#1877f2]" },
  { icon: MessageCircle, label: "WhatsApp Group", href: COMPANY.whatsappGroupUrl, color: "hover:text-[#25d366]" },
  { icon: Send,      label: "Telegram Bot",   href: COMPANY.telegramBotUrl,  color: "hover:text-[#2aabee]" },
];

const legalLinks = [
  { label: "Terms of Service",        href: "/terms" },
  { label: "Privacy Policy",          href: "/privacy" },
  { label: "Refund & Cancellation",   href: "/refund-policy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#060B18] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Top gradient edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 mb-16">

          {/* Brand */}
          <div className="flex-1">
            <Link href="/" className="flex items-center gap-3 group mb-4 inline-flex">
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
              <div className="flex items-center">
                <span className="text-sm md:text-base lg:text-xl font-bold text-white tracking-wider leading-none block whitespace-nowrap">
                  LOGIC INTELLIGENCE TECHNOLOGIES PVT. LTD.
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed font-medium">
              &quot;Where Logic Meets Innovation — We Build What Others Imagine&quot;
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="group flex items-start gap-3 w-max max-w-full"
                >
                  <Mail className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors break-all">
                    {COMPANY.email}
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="group flex items-start gap-3 w-max"
                >
                  <Phone className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
                    {COMPANY.phone}
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-zinc-500 shrink-0" />
                <span className="text-sm text-zinc-400">{COMPANY.address}</span>
              </li>
            </ul>

            <div className="flex flex-col justify-start">
              <a
                href={`https://wa.me/${COMPANY.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform shadow-[0_0_15px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mb-6">
          {socialLinks.map(({ icon: Icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 transition-all hover:border-white/30 hover:scale-110 ${color}`}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6">
          {legalLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-zinc-500 max-w-2xl">
            © {new Date().getFullYear()} {COMPANY.legalName}. All Rights Reserved. | CIN: {COMPANY.cin}
          </p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
            }}
            className="text-xs font-medium text-zinc-400 flex items-center gap-1"
          >
            {"Made with ".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline mx-1" />
            </motion.div>
            {" in Coimbatore, India".split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
