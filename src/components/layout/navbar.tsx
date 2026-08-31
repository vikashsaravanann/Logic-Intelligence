"use client";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Monitor, LayoutTemplate, Palette, CloudUpload, Code, Cloud, Building, Hotel, Plane, ShoppingCart, Smartphone, Brush, Terminal, Gamepad, Users, GraduationCap, Receipt, Search, FileText, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { COMPANY } from "@/config/company";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";
const NavLink = ({ href, children, onHover }: { href: string; children: React.ReactNode; onHover?: () => void }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path));

  return (
    <Link 
      href={href} 
      className={`text-[12px] font-semibold tracking-widest transition-colors relative py-4 flex items-center gap-1 ${isActive(href) ? "text-primary" : "text-zinc-300 hover:text-primary"}`}
      onMouseEnter={onHover}
    >
      {children}
      {isActive(href) && (
        <motion.div layoutId="activeNav" className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </Link>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = createClientComponentClient({
      supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    });
    
    const fetchSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };
    
    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (window.innerWidth > 1024) setActiveDropdown(menu);
  };
  const handleMouseLeave = () => {
    if (window.innerWidth > 1024) setActiveDropdown(null);
  };

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 h-[2px] bg-primary z-[60] shadow-[0_0_10px_rgba(0,191,255,0.8)]"
        style={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: typeof window !== 'undefined' ? window.scrollY / (document.body.scrollHeight - window.innerHeight) : 0 }}
      />
      
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-[rgba(10,15,30,0.85)] backdrop-blur-[20px] saturate-180 border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] py-4" : "bg-transparent py-6"}`}>
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8 relative z-50">
          <div className="flex items-center justify-between gap-4 xl:gap-8">
            
            {/* Logo Animation */}
            <Link href="/" className="flex items-center gap-3 group relative z-50 shrink-0">
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10 }}
                className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_15px_rgba(0,191,255,0.4)] animate-neon-pulse bg-gradient-to-tr from-primary to-accent"
              >
                <img src="/assets/logo.jpg" alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement!.innerHTML = '<span class="font-bold text-lg text-white">LIT</span>'; }} />
              </motion.div>
              <div className="flex items-center">
                <span className="text-[11px] sm:text-[12px] lg:text-[13px] font-bold text-white tracking-wider leading-none whitespace-nowrap hidden sm:block">
                  {COMPANY.displayName.toUpperCase()}
                </span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden xl:flex items-center gap-4 2xl:gap-7">
              <NavLink href="/">HOME</NavLink>
              <NavLink href="/#services">SERVICES</NavLink>
              <NavLink href="/work">WORK</NavLink>
              
              {/* Packages Dropdown */}
              <div className="relative group" onMouseEnter={() => handleMouseEnter('packages')} onMouseLeave={handleMouseLeave}>
                <NavLink href="/packages" onHover={() => handleMouseEnter('packages')}>
                  PACKAGES <ChevronDown className="w-4 h-4" />
                </NavLink>
                <AnimatePresence>
                  {activeDropdown === 'packages' && (
                    <motion.div 
                      initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0 }} style={{ transformOrigin: "top center" }}
                      className="absolute top-[100%] left-1/2 -translate-x-1/2 w-[250px] bg-[rgba(10,15,30,0.98)] backdrop-blur-[30px] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,191,255,0.1)] p-4 flex flex-col space-y-2"
                    >
                      <Link href="/contact?package=digital-launch-pack" className="flex justify-between items-center text-[13px] font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors group/link">Digital Launch Pack <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" /></Link>
                      <Link href="/contact?package=business-pro-pack" className="flex justify-between items-center text-[13px] font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors group/link">Business Pro Pack <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" /></Link>
                      <Link href="/contact?package=enterprise-pack" className="flex justify-between items-center text-[13px] font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors group/link">Enterprise Pack <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" /></Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink href="/about">ABOUT</NavLink>
              <NavLink href="/blog">BLOG</NavLink>
              <NavLink href="/checklist">CHECKLIST</NavLink>
              <NavLink href="/discovery">DISCOVERY</NavLink>
            </div>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4 xl:gap-6 ml-2">
              
              {session ? (
                <div className="hidden lg:flex relative group" onMouseEnter={() => handleMouseEnter('user')} onMouseLeave={handleMouseLeave}>
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 transition-colors">
                    {session.user?.user_metadata?.avatar_url ? (
                      <img src={session.user.user_metadata.avatar_url} alt="Profile" className="w-6 h-6 rounded-full" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                        {session.user?.email?.[0]?.toUpperCase() || 'U'}
                      </div>
                    )}
                    <span className="text-xs font-bold text-white max-w-[100px] truncate">
                      {session.user?.user_metadata?.full_name || session.user?.email}
                    </span>
                    <ChevronDown className="w-3 h-3 text-white" />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === 'user' && (
                      <motion.div 
                        initial={{ opacity: 0, scaleY: 0 }} animate={{ opacity: 1, scaleY: 1 }} exit={{ opacity: 0, scaleY: 0 }} style={{ transformOrigin: "top right" }}
                        className="absolute top-[100%] right-0 mt-2 w-[200px] bg-[rgba(10,15,30,0.98)] backdrop-blur-[30px] border border-white/[0.08] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(0,191,255,0.1)] p-2 flex flex-col space-y-1 z-[100]"
                      >
                        <Link href="/profile" className="flex items-center text-sm font-medium text-zinc-300 hover:text-white p-2 hover:bg-[rgba(0,191,255,0.08)] rounded-lg transition-colors">
                          My Profile
                        </Link>
                        {session.user?.email?.endsWith('@logicintelligencetechnologies.in') && (
                          <Link href="/dashboard" className="flex items-center text-sm font-medium text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                            Admin Dashboard
                          </Link>
                        )}
                        <form action="/auth/signout" method="post">
                          <button type="submit" className="w-full flex items-center text-sm font-medium text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                            Sign Out
                          </button>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link href="/login" className="hidden lg:flex px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20 hover:bg-white/10 transition-colors whitespace-nowrap">
                  Login
                </Link>
              )}
              <Link href="/contact" className="hidden lg:flex relative group px-6 py-2 rounded-full overflow-hidden items-center justify-center shadow-[0_0_20px_rgba(0,191,255,0.3)] transition-transform hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                <span className="relative z-10 text-[11px] font-bold text-white tracking-widest uppercase">
                  Start Project
                </span>
              </Link>
              
              <button className="lg:hidden text-white relative z-50 p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Floating AI Pill (Home Page Only) */}
        <AnimatePresence>
          {pathname === "/" && !scrolled && (
            <motion.div 
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, pointerEvents: "none" }}
              transition={{ duration: 0.3 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 md:mt-4 z-40"
            >
              <Link 
                href="/ai" 
                className="group flex items-center gap-3 bg-[rgba(10,15,30,0.8)] backdrop-blur-md border border-white/10 hover:border-cyan-500/40 px-6 py-2 rounded-full transition-all duration-300 shadow-xl hover:shadow-[0_0_20px_rgba(0,191,255,0.15)]"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.8)]"></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-zinc-300 group-hover:text-white transition-colors whitespace-nowrap">
                  EXPLORE OUR ENTERPRISE AI ASSISTANT
                </span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }} transition={{ type: "tween", duration: 0.3 }} className="fixed top-0 right-0 w-[85vw] h-[100vh] bg-[rgba(10,15,30,0.98)] backdrop-blur-2xl border-l border-white/10 lg:hidden shadow-2xl z-40 overflow-y-auto">
              <div className="flex flex-col px-6 py-24 space-y-6">
                <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">HOME</Link>
                <Link href="/#services" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">SERVICES</Link>
                <Link href="/work" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">WORK</Link>
                <Link href="/packages" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">PACKAGES</Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">ABOUT</Link>
                <Link href="/blog" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">BLOG</Link>
                <Link href="/checklist" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">CHECKLIST</Link>
                <Link href="/discovery" onClick={() => setIsOpen(false)} className="text-lg font-bold text-zinc-300">DISCOVERY</Link>
                
                <div className="mt-auto pt-8 flex flex-col space-y-4">
                  {session ? (
                    <div className="flex flex-col gap-2">
                      <Link href="/profile" onClick={() => setIsOpen(false)} className="px-6 py-4 text-center rounded-xl text-base font-bold text-white border border-primary/50 bg-primary/10 hover:bg-primary/20 w-full transition-colors flex items-center justify-center gap-2">
                        {session.user?.user_metadata?.avatar_url && (
                          <img src={session.user.user_metadata.avatar_url} alt="Profile" className="w-6 h-6 rounded-full" />
                        )}
                        Go to Profile
                      </Link>
                      {session.user?.email?.endsWith('@logicintelligencetechnologies.in') && (
                        <Link href="/dashboard" onClick={() => setIsOpen(false)} className="px-6 py-3 text-center rounded-xl text-sm font-bold text-white border border-red-500/50 bg-red-500/20 hover:bg-red-500/30 w-full transition-colors flex items-center justify-center gap-2">
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)} className="px-6 py-4 text-center rounded-xl text-base font-bold text-white border border-white/20 hover:bg-white/10 w-full transition-colors">
                      Login
                    </Link>
                  )}
                  <Link href="/contact" onClick={() => setIsOpen(false)} className="relative group px-6 py-4 text-center rounded-xl overflow-hidden w-full flex items-center justify-center shadow-[0_0_20px_rgba(0,191,255,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 opacity-90 transition-opacity duration-300"></div>
                    <span className="relative z-10 text-base font-bold text-white tracking-widest uppercase">
                      Start Project
                    </span>
                  </Link>
                  <a href="https://wa.me/919342877474" className="px-6 py-4 text-center rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] w-full flex items-center justify-center gap-2">
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Backdrop */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
            />
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
