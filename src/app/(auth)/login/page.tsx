"use client";
import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, Shield, Zap, Code, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { COMPANY } from "@/config/company";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { env } from "@/config/env";

function validateEmail(email: string) {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address.";
  return undefined;
}

function validatePassword(password: string, isSignUp: boolean) {
  if (!password) return "Password is required.";
  if (isSignUp && password.length < 6) return "Password must be at least 6 characters.";
  return undefined;
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

function AuthContent() {
  const supabase = createClientComponentClient({
    supabaseUrl: env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [serverSuccess, setServerSuccess] = useState<string | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorDescription = searchParams.get("error_description");
    const errorParam = searchParams.get("error");
    if (errorDescription) {
      setServerError(decodeURIComponent(errorDescription));
    } else if (errorParam) {
      setServerError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleOAuthLogin = async (provider: 'google' | 'github') => {
    try {
      setIsLoading(true);
      setServerError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setServerError(err.message || `Failed to authenticate with ${provider}.`);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password, isSignUp);
    if (eErr || pErr) {
      setFieldErrors({ email: eErr, password: pErr });
      return;
    }
    
    setFieldErrors({});
    setIsLoading(true);
    setServerError(null);
    setServerSuccess(null);
    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
        });
        if (error) throw error;
        setServerSuccess("Account created! Please check your email to verify your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Trigger login notification quietly in background
        fetch('/api/auth/login-notification', { method: 'POST' }).catch(() => {});
        router.push("/dashboard");
      }
    } catch (err: any) {
      setServerError(err.message || "Authentication failed.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase = "w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all shadow-sm";
  
  return (
    <main className="min-h-screen flex bg-white font-sans overflow-hidden">
      {/* Form Column */}
      <motion.div 
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className={`w-full lg:w-[45%] flex flex-col justify-center relative bg-white z-20 shadow-[0_0_60px_rgba(0,0,0,0.1)] ${isSignUp ? 'lg:order-last' : 'lg:order-first'}`}
      >
        <div className="w-full h-full flex flex-col justify-center relative px-6 md:px-12 lg:px-16 py-12">
          <div className="w-full max-w-[460px] mx-auto z-10 px-6 sm:px-0 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center text-center">
          <Link href="/" className="inline-block mb-10 group">
            <div className="flex flex-col items-center gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-gray-100 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105">
                <img
                  src={COMPANY.logoIconPath}
                  alt={`${COMPANY.displayName} logo`}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-4xl font-black text-gray-900">LI</span>';
                  }}
                />
              </div>
              <div className="flex flex-col items-center">
                <span className="block text-2xl sm:text-[28px] font-black text-gray-900 tracking-wider leading-tight uppercase">
                  LOGIC INTELLIGENCE TECHNOLOGIES
                </span>
                <span className="block text-sm sm:text-base font-bold text-gray-500 uppercase tracking-[0.2em] mt-2">
                  WHERE LOGIC MEETS INNOVATION
                </span>
              </div>
            </div>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            {isSignUp ? "CREATE ACCOUNT" : "WELCOME BACK"}
          </h1>
          <p className="text-gray-500 text-[15px]">
            {isSignUp ? "Join the future of enterprise software." : "Sign in to your secure client dashboard."}
          </p>
        </motion.div>

        {serverError && (
          <motion.div variants={itemVariants} className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-start gap-3">
            <Shield className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold mb-1">Authentication Error</p>
              <p>{serverError}</p>
              {serverError.toLowerCase().includes("google") && (
                <p className="mt-2 text-xs opacity-80 font-normal">
                  Google Login requires configuration in Supabase Dashboard (Authentication &gt; Providers &gt; Google).
                </p>
              )}
            </div>
          </motion.div>
        )}

        {serverSuccess && (
          <motion.div variants={itemVariants} className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm font-medium flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            {serverSuccess}
          </motion.div>
        )}

        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => handleOAuthLogin('google')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] font-bold bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all text-gray-700 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => handleOAuthLogin('github')}
            disabled={isLoading}
            className="flex items-center justify-center gap-2.5 py-3 rounded-xl text-[13px] font-bold bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-sm transition-all text-gray-700 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 496 512" fill="#111827">
              <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
            </svg>
            GitHub
          </button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Or sign in with email</span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest mb-1.5">
              Work Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`${inputBase} ${fieldErrors.email ? "border-red-400 ring-4 ring-red-50" : ""}`}
              />
            </div>
            {fieldErrors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.email}</p>}
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-widest">
                Password
              </label>
              {!isSignUp && (
                <a href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
              <input
                type={showPass ? "text" : "password"}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputBase} pr-11 ${fieldErrors.password ? "border-red-400 ring-4 ring-red-50" : ""}`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {fieldErrors.password && <p className="mt-1.5 text-xs text-red-500 font-medium">{fieldErrors.password}</p>}
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ y: -1 }}
            whileTap={{ y: 1 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-[14px] text-white bg-gray-900 hover:bg-black transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                {isSignUp ? "Create Secure Account" : "Access Dashboard"}
                <ArrowRight className="w-4 h-4" /> 
              </>
            )}
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setServerError(null);
              setServerSuccess(null);
              setFieldErrors({});
            }}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium"
          >
            {isSignUp ? (
              <>Already registered? <span className="text-primary font-bold">Sign In Here</span></>
            ) : (
              <>New to Logic Intelligence? <span className="text-primary font-bold">Apply for Access</span></>
            )}
          </button>
        </motion.div>
      </motion.div>
    </div>
        </div>
      </motion.div>

      {/* Brand Showcase Column */}
      <motion.div 
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 70, damping: 20 }}
        className={`hidden lg:flex flex-1 bg-zinc-950 relative overflow-hidden flex-col items-center justify-center p-12 xl:p-24 border-zinc-800 z-10 ${isSignUp ? 'border-r' : 'border-l'}`}
      >
        {/* Subtle, highly professional grid background */}
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center my-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-[0.25em] font-sans">Client Portal Network</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl xl:text-5xl leading-[1.2] font-serif text-white tracking-wide mb-8"
          >
            Precision engineering for<br/>
            <span className="text-zinc-400 font-light italic">enterprise scale.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[17px] xl:text-[19px] text-zinc-400 leading-relaxed mb-16 max-w-2xl font-light tracking-wide"
          >
            Logic Intelligence Technologies builds high-performance SaaS platforms, custom enterprise software, and scalable web applications. Log in to track milestones, view analytics, and collaborate with your dedicated engineering team.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-12 w-full pt-10 border-t border-white/10"
          >
            <div className="flex flex-col items-center text-center group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 group-hover:bg-white/10 transition-colors">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[18px] text-white tracking-wide mb-2 font-serif">Custom Software</h4>
              <p className="text-[14px] text-zinc-500 leading-relaxed max-w-[280px]">
                Bespoke CRM, ERP, and highly scalable web applications built from scratch for your business logic.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 group-hover:bg-white/10 transition-colors">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[18px] text-white tracking-wide mb-2 font-serif">AI & Automation</h4>
              <p className="text-[14px] text-zinc-500 leading-relaxed max-w-[280px]">
                Intelligent machine learning models and automated workflows to reduce overhead and accelerate growth.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 group-hover:bg-white/10 transition-colors">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[18px] text-white tracking-wide mb-2 font-serif">Cloud Architecture</h4>
              <p className="text-[14px] text-zinc-500 leading-relaxed max-w-[280px]">
                Bank-grade encryption, seamless API integrations, and robust database infrastructures.
              </p>
            </div>

            <div className="flex flex-col items-center text-center group">
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl mb-4 group-hover:bg-white/10 transition-colors">
                <ArrowRight className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold text-[18px] text-white tracking-wide mb-2 font-serif">Real-Time Portal</h4>
              <p className="text-[14px] text-zinc-500 leading-relaxed max-w-[280px]">
                Direct access to project progress, real-time lead analytics, and direct communication with our developers.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-gray-900 font-bold">Loading Secure Portal...</div>}>
      <AuthContent />
    </Suspense>
  );
}
