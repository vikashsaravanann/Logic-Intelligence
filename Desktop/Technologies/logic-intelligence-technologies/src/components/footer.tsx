"use client";
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";

export default function Footer() {
  const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <li>
      <Link href={href} className="group flex items-center gap-1 text-sm text-zinc-400 hover:text-primary transition-colors w-max">
        {children}
        <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
      </Link>
    </li>
  );

  return (
    <footer className="bg-[#060B18] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Top Gradient Edge */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dbuznxrrm/image/upload/v1704285811/grid-pattern_q5aocu.svg')] opacity-[0.03]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-12 lg:col-span-4">
            <Link href="/" className="flex items-center gap-3 group mb-6 inline-flex">
              <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 bg-gradient-to-tr from-primary to-accent shadow-[0_0_15px_rgba(0,191,255,0.3)] animate-neon-pulse">
                <img src="/Logic-Intelligence/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-lg text-white">LIT</span>'; }} />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text-anim tracking-tight leading-none block">
                  Logic Intelligence Technologies
                </span>
                <span className="text-[11px] text-zinc-400 tracking-widest leading-none block uppercase mt-1 font-medium">Pvt. Ltd.</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 mb-2 leading-relaxed max-w-sm font-medium">
              "Where Logic Meets Innovation — We Build What Others Imagine"
            </p>
            <p className="text-xs text-zinc-500 mb-6 max-w-sm">
              Registered Private Limited Company — Coimbatore, Tamil Nadu, India
            </p>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com/startupwithVikash" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 transition-all text-zinc-400 hover:text-white group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 relative z-10 group-hover:scale-110 transition-transform"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              <FooterLink href="/services/full-stack-development">Full Stack Dev</FooterLink>
              <FooterLink href="/services/web-designing">Web Designing</FooterLink>
              <FooterLink href="/services/hotel-website">Hotel Websites</FooterLink>
              <FooterLink href="/services/travel-agency-website">Travel Portals</FooterLink>
              <FooterLink href="/services/software-development">Software Dev</FooterLink>
              <FooterLink href="/services/game-development">Game Development</FooterLink>
              <FooterLink href="/services/ecommerce-website">E-Commerce</FooterLink>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/packages">Packages</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/free-demo">Free Demo</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4">
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/terms-of-service">Terms of Service</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
              <FooterLink href="#">Refund Policy</FooterLink>
            </ul>
          </div>

          {/* Column 5: Contact Details */}
          <div className="md:col-span-12 lg:col-span-2">
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:startupwithvikashsaravanan@gmail.com" className="group flex items-start gap-3 w-max max-w-full">
                  <Mail className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors break-all">Email Us</span>
                </a>
              </li>
              <li>
                <a href="tel:+919342877474" className="group flex items-start gap-3 w-max">
                  <Phone className="h-5 w-5 text-zinc-500 group-hover:text-primary transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">+91 9342877474</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 w-max">
                  <MessageCircle className="h-5 w-5 text-zinc-500 group-hover:text-[#25D366] transition-colors shrink-0" />
                  <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">WhatsApp Chat</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-zinc-500 shrink-0" />
                <span className="text-sm text-zinc-400">Coimbatore, Tamil Nadu, India</span>
              </li>
            </ul>
            
            <a href="https://wa.me/919342877474" target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:scale-105 transition-transform shadow-[0_0_15px_rgba(37,211,102,0.3)]">
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-xs text-zinc-500 max-w-2xl">
            © {new Date().getFullYear()} Logic Intelligence Technologies Private Limited. All Rights Reserved. | CIN: U72900TZ2026PTC123456
          </p>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
            }}
            className="text-xs font-medium text-zinc-400 flex items-center gap-1"
          >
            {"Made with ".split("").map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char === " " ? "\u00A0" : char}</motion.span>
            ))}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <Heart className="w-3 h-3 text-red-500 fill-red-500 inline mx-1" />
            </motion.div>
            {" in Coimbatore, India".split("").map((char, i) => (
              <motion.span key={i} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>{char === " " ? "\u00A0" : char}</motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
